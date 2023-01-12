import { HttpException, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { writeHeapSnapshot } from 'v8';
import { GameRepository } from './game.repository';
import { GameData } from './game.util.ts/game.server';
import { GAME_STATE } from '../util/utils'
import { SubmitCardDto } from './game.util.ts/game.player';

@Injectable()
export class GameService {

	constructor(
		private gameRepository: GameRepository,
		private authService: AuthService
	) { }

	/*   방생성, 방입장, 방나가기, 방찾기 함수  */
	createGame(room: string): GameData {
		return this.gameRepository.createGame(room);
	}

	joinRoom(room: string, client: Socket) {
		let room_data: GameData = this.gameRepository.findByRoom(room);
		room_data.sockets.push(client);
		this.sendMessage(room_data, "join_user", null)
		console.log(room_data.sockets.length);
		if (room_data.sockets.length == 1) {
			this.sendMessage(room_data, "host", null);
			room_data.players[0].socket = client;
			room_data.host = client;
		}
		else if (room_data.sockets.length == 2) {
			this.sendMessage(room_data, "ready", null);
			room_data.players[1].socket = client;
		}
	}

	leaveRoom(room: string, client: Socket) {
		let room_data = this.gameRepository.leaveRoom(room, client);
		if (room_data.roomState > GAME_STATE.READY) {
			if (room_data.players[0].socket.id == client.id) {
				this.sendMessage(room_data, "end", {
					"winner": 1,
				})
				//save data
				console.log(`destory room ${room_data.room}`);
				this.gameRepository.deleteRoom(room_data.room);
			}
			else if (room_data.players[1].socket.id == client.id) {
				this.sendMessage(room_data, "end", {
					"winner": 0,
				})
				//save data
				console.log(`destory room ${room_data.room}`);
				this.gameRepository.deleteRoom(room_data.room);
			}
		}

		if (room_data.sockets.length < 2)
			this.sendMessage(room_data, "unready", null);
		if (room_data.sockets.length == 0) {
			console.log(`destory room ${room_data.room}`);
			this.gameRepository.deleteRoom(room_data.room);
		}
	}

	findByRoom(room: string): GameData {
		return this.gameRepository.findByRoom(room);
	}
	///////////////////////////////////////////

	// 초대코드 입장시 jwt만들어주는놈
	getRoomJwtCode(room: string): Object {
		let roomData = this.gameRepository.findByRoom(room);
		if (!roomData)
			return null;
		let ret = this.authService.jwtSign({ room: roomData.room });
		return ret;
	}

	//broad cast event
	sendMessage(room_data: GameData, message_name: string, data: any) {
		for (let i = 0; i < room_data.sockets.length; i++) {
			room_data.sockets[i].emit(message_name, data);
		}
	}

	setStartGame(room: string, client: Socket) {
		let room_data = this.gameRepository.findByRoom(room);
		if (room_data.roomState == GAME_STATE.READY && client.id == room_data.host.id) {
			let turn;
			let player1_dice = Math.floor((Math.random() * 6) + 1);
			let player2_dice = Math.floor((Math.random() * 6) + 1);
			while (player1_dice == player2_dice) {
				player1_dice = Math.floor((Math.random() * 6) + 1);
				player2_dice = Math.floor((Math.random() * 6) + 1);
			}
			console.log(`dice -> ${player1_dice} vs ${player2_dice}`);
			if (player1_dice > player2_dice)
				turn = 0;
			else
				turn = 1;
			this.gameRepository.setTurn(room, turn);
			console.log(`${room} - turn is ${turn ? "second player" : "first plyaer"}`);
			this.sendMessage(room_data, "start_game", {
				player1: player1_dice,
				player2: player2_dice,
				turn: `${turn ? 1 : 0}`
			})
		}
	}

	submitCard(room: string, client: Socket, submit: SubmitCardDto) {
		let room_data = this.gameRepository.findByRoom(room);
		if ((room_data.roomState == GAME_STATE.FIRST_CARD_SELECT || room_data.roomState == GAME_STATE.SECOND_CARD_SELECT) 
			&& room_data.players[room_data.turn].socket.id == client.id) {
				if (room_data.players[room_data.turn].decraseValue(submit.kind, submit.count)) {
					if (room_data.roomState == GAME_STATE.FIRST_CARD_SELECT)
						this.gameRepository.setRoomState(room, GAME_STATE.FIRST_MONEY_SELECT);
					else if (room_data.roomState == GAME_STATE.SECOND_CARD_SELECT)
						this.gameRepository.setRoomState(room, GAME_STATE.SECOND_CHOICE)
				}
				else {
				}
		}
	}

	async tmp() {
		this.gameRepository.servers.map((value) => {
			console.log(value.room);
			console.log(value.sockets.length);
			value.players[0].decraseValue("fox", 4);
		})
	}
}

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
		room_data.sendMessage("join_user", null);
		console.log(room_data.sockets.length);
		if (room_data.sockets.length == 1) {
			room_data.sendMessage("host", null);
			room_data.players[0].socket = client;
			room_data.host = client;
			client.emit("player", 0);
		}
		else if (room_data.sockets.length == 2) {
			room_data.sendMessage("ready", null);
			room_data.players[1].socket = client;
			client.emit("player", 1);
		}
		else {
			client.emit("observer", 1);
		}
	}

	leaveRoom(room: string, client: Socket) {
		let room_data = this.gameRepository.leaveRoom(room, client);
		if (room_data.roomState > GAME_STATE.READY) {
			if (room_data.players[0].socket.id == client.id) {
				room_data.sendMessage("end", {
					"winner": 1,
				})
				//save data
				console.log(`destory room ${room_data.room}`);
				this.gameRepository.deleteRoom(room_data.room);
			}
			else if (room_data.players[1].socket.id == client.id) {
				room_data.sendMessage("end", {
					"winner": 0,
				})
				//save data
				console.log(`destory room ${room_data.room}`);
				this.gameRepository.deleteRoom(room_data.room);
			}
		}

		if (room_data.sockets.length < 2)
			room_data.sendMessage("unready", null);
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
	sendMessage(room_data: GameData, ) {
		
	}

	setStartGame(room: string, client: Socket) {
		let room_data = this.gameRepository.findByRoom(room);
		let dice = room_data.Start(client);
		
	}

	submitCard(room: string, client: Socket, kind: string) {
		let room_data = this.gameRepository.findByRoom(room);
		room_data.submitCard(client, kind);
	}

	submitToken(room: string, client: Socket, count: number) {
		let room_data = this.gameRepository.findByRoom(room);
		room_data.submitToken(client, count);
	}

	submitChoice(room: string, client: Socket, choice: string) {
		let room_data = this.gameRepository.findByRoom(room);
		room_data.submitChoice(client, choice);
	}


	async tmp() {
		this.gameRepository.servers.map((value) => {
			console.log(`gameState -> ${value.roomState}`);
			console.log(`player1 -> ${value.players[0].token}`);
			console.log(`player2 -> ${value.players[1].token}`);
			console.log(`player1_token -> ${value.player1_token}`);
			console.log(`player2_token-> ${value.player2_token}`);
		})
	}
}

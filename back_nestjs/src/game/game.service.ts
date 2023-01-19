import { HttpException, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { writeHeapSnapshot } from 'v8';
import { GameRepository } from './game.repository';
import { GameData } from './game.util.ts/game.server';
import { GAME_STATE } from '../util/utils'
import { SubmitCardDto } from './game.util.ts/game.player';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GameService {

	constructor(
		private gameRepository: GameRepository,
		private authService: AuthService,
		private userService: UserService,
	) { }

	/*   방생성, 방입장, 방나가기, 방찾기 함수  */
	createGame(room: string): GameData {
		return this.gameRepository.createGame(room);
	}

	joinRoom({room, avatar, nickname }, client: Socket) {
		let room_data: GameData = this.gameRepository.findByRoom(room);
		room_data.sockets.push(client);
		console.log(room_data.sockets.length);
		if(room_data.sockets.length == 1) {
			client.emit("host", null);
			room_data.host = client;
		}
		else if(room_data.sockets.length == 2)
			room_data.sendMessage("ready", null);
		let player = this.checkPlayer(room_data);
		console.log(`plyaer join ${player}`);
		if (player) {
			room_data.players[player - 1].socket = client;
			room_data.players[player - 1].nickname = nickname;
			client.emit("player", player);
			room_data.sendMessage("current_player", {
				player1_number: 1,
				player1_nickname : room_data.players[0].nickname,
				player1_avatar: room_data.players[0].avatar,
				player2_number: 2,
				player2_nickname : room_data.players[1].nickname,
				player2_avatar: room_data.players[1].avatar,
			});
		}
		else {
			console.log("aaa");
			room_data.sendMessage("observer_join", null);
		}
	}

	leaveRoom(room: string, client: Socket) {
		let room_data = this.gameRepository.leaveRoom(room, client);
		if (room_data.sockets.length == 0) {
			console.log(`destory room ${room_data.room}`);
			this.gameRepository.deleteRoom(room_data.room);
		}
		else {
			let player = this.isPlayer(room_data, client)
			if (player) {
				if (this.isGaming(room_data)) {
					room_data.sendMessage("end",
					{
						"winner": player,
					})
					//save data
					console.log(`Wiinner is player ${player}`);
					console.log(`destory room ${room_data.room}`);
					this.gameRepository.deleteRoom(room_data.room);
				}
				else {
					room_data.players[player - 1].socket = null;
					room_data.sendMessage("leave_player", player);
				}
			}
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

	getRoomGuestJwtCode(room: string): Object {
		let roomData = this.gameRepository.findByRoom(room);
		if (!roomData)
			return null;
		let ret = this.authService.jwtSign({ room: roomData.room, nickname: 'guest'});
		return ret;
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

	isPlayer(room_data: GameData, client: Socket) : number{
		if (room_data.players[0].socket.id == client.id)
			return 1;
		else if (room_data.players[1].socket.id == client.id)
			return 2;
		return 0;
	}

	isGaming(room_data: GameData) {
		if (room_data.roomState > GAME_STATE.READY)
			return true;
		return false;
	}

	checkPlayer(room_data: GameData) : number {
		if (room_data.players[0].socket == null)
			return 1;
		else if (room_data.players[1].socket == null)
			return 2
		return 0;
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

import { UseFilters, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsException,
} from '@nestjs/websockets';
import { Server, Socket } from "socket.io";
import { AuthService } from 'src/auth/auth.service';
import { GameService } from 'src/game/game.service';


@WebSocketGateway({
	cors: {
		origin: "*",
        credentials: false
	},
	middlewares: [],
	namespace: "/game",
})
export class GameGateWay implements OnGatewayConnection, OnGatewayDisconnect {

	constructor(
		private authService: AuthService,
		private gameService: GameService
	) { }

	@WebSocketServer()
	server: Server;

	wsClients = [];

	private async checkValid(@ConnectedSocket() client: Socket) {
		/********* 암시적인 에러 발생 가능 부분********/
		let jwt = String(client.handshake.headers.authorization);
		jwt = jwt.replace("Bearer ", "");
		/*********************************************/

		const user = await this.authService.jwtVerify(jwt);
		if (!user) {
			console.log("need jwt");
			client._error('error');
		}
		else {
			if (!user["room"]) {
				console.log("jwt does not have room property");
				client._error('error');
			}
		}
		return user;
	}

	async handleConnection(@ConnectedSocket() client: Socket) {
		console.log(`socket connection -> ${client.id}`);
		let jwt: any = await this.checkValid(client);
		try {
			console.log(`connected nickname = ${jwt["nickname"]} in ${jwt["room"]}`);
			await this.gameService.createGame(jwt["room"]);
			this.gameService.joinRoom(jwt, client);
			client.join(jwt["room"]);
		}
		catch {
			console.log('handle connection error');
		}
	}

	async handleDisconnect(@ConnectedSocket() client) {
		let jwt = await this.checkValid(client);
		try {
			console.log(`disconnect id = ${jwt["id"]} in ${jwt["room"]}`);
			let room_data = this.gameService.findByRoom(jwt["room"]);
			this.gameService.leaveRoom(room_data.room, client);
		} catch (e){ 
			console.log("disconnected error");
		}
	}

	@SubscribeMessage("start")
	async Start(@ConnectedSocket() client) {
		let jwt = await this.checkValid(client);
		try {
			this.gameService.setStartGame(jwt["room"], client);
		}
		catch (e){
			console.log('start error');
		}
	}

	@SubscribeMessage("submit_card")
	async submit_card(@ConnectedSocket() client, @MessageBody("kind") kind) {
		let jwt = await this.checkValid(client);
		try {
			this.gameService.submitCard(jwt["room"], client, kind);
		}
		catch {}
	}

	@SubscribeMessage("submit_token")
	async submit_token(@ConnectedSocket() client, @MessageBody('count') count) {
		let jwt = await this.checkValid(client);
		try {
			this.gameService.submitToken(jwt["room"], client, count);
		}
		catch {}
	}

	@SubscribeMessage("submit_choice")
	async submit_choice(@ConnectedSocket() client, @MessageBody("choice") choice) {
		let jwt = await this.checkValid(client);
		try {
			this.gameService.submitChoice(jwt["room"], client, choice);
		}
		catch {}
	}

	@SubscribeMessage("kk")
	async kk(@ConnectedSocket() client) {
		client.emit('kk', null);
	}


}
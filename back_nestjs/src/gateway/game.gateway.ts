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

let clientMap = new Map<string, Socket>();

@WebSocketGateway({
	cors: {
		origin: "*",
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
		let jwt: any = await this.checkValid(client);
		try {
			console.log(`connected websocket id = ${jwt["id"]} in ${jwt["room"]}`);
			this.gameService.createGame(jwt["room"]);
			this.gameService.joinRoom(jwt["room"], client);
			client.join(jwt["room"]);
		}
		catch {

		}

	}

	async handleDisconnect(@ConnectedSocket() client) {
		let jwt = await this.checkValid(client);
		try {
			console.log(`disconnect id = ${jwt["id"]} in ${jwt["room"]}`);
			let room_data = this.gameService.findByRoom(jwt["room"]);
			this.gameService.leaveRoom(room_data.room, client);
		} catch (e){ 

		}
	}

	@SubscribeMessage("start")
	async Start(@ConnectedSocket() client) {
		let jwt = await this.checkValid(client);
		try {
			this.gameService.setStartGame(jwt["room"], client);
		}
		catch (e){
		}
	}

	@SubscribeMessage("submit_card")
	async submit_card(@ConnectedSocket() client, @MessageBody("kind") kind, @MessageBody('count') count) {
		let jwt = await this.checkValid(client);
		try {
			this.gameService.submitCard(jwt["room"], client, {kind: kind, count: count});
		}
		catch {}
	}


}
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
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
export class GameGateWay implements OnGatewayConnection, OnGatewayDisconnect{

    constructor(
      private authService: AuthService,
      private gameService: GameService
    ){}

    @WebSocketServer()
    server: Server;

    wsClients = [];


    private async getUserId(@ConnectedSocket() client) {
      try {
        /********* 암시적인 에러 발생 가능 부분********/
        let haha = String(client.handshake.headers.authorization);
        haha = haha.replace("Bearer ", "");
        /*********************************************/
        const user = await this.authService.jwtVerify(haha);
        if (user) return user;
        else throw new WsException("need jwt");
      } catch (e) {}
    }

    async handleConnection(@ConnectedSocket() client :Socket) {
      let jwt = await this.getUserId(client);
      let room = jwt["room"];
      if (room) {
        console.log(jwt);
        console.log(jwt["room"]);
        this.gameService.createGame(jwt["room"]);
        this.gameService.joinRoom(jwt["room"], client);
        client.join(jwt["room"]);
      }
    }
    
    async handleDisconnect(@ConnectedSocket() client) {
      let jwt = await this.getUserId(client);
      console.log(`leftuser in ${jwt["room"]}`);
      let room_data = this.gameService.findByRoom(jwt["room"]);
      this.gameService.leaveRoom(room_data.room, client);
    }
}
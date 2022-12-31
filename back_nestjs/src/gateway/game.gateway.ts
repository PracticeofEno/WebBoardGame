import { ConnectedSocket, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "http";

@WebSocketGateway({
    cors: {
      origin: "*",
    },
    middlewares: [],
    namespace: "/game",
})
export class GameGateWay {

    constructor(

    ){}

    @WebSocketServer()
    server: Server;

    wsClients = [];

    async handleConnection(@ConnectedSocket() client) {
      console.log("connected");
      // let user_id = await this.getUserId(client);
      // let user = await this.userService.getUserById(user_id);
      // console.log("chat join user : " + user.nickname);
      // this.SocketConnect(user, client);
      // let tmp = {
      //   user: user,
      //   client: client,
      // };
      // this.wsClients.push(tmp);
    }
    
    async handleDisconnect(@ConnectedSocket() client) {

    }
}
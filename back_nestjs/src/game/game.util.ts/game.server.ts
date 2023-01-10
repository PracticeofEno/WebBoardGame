import { Server, Socket } from "socket.io";
import { Player } from "./game.player";

export class GameData {

    constructor(room:string, gamAdventage:number = 10 , wait: number = 8, max: number = 15) {
        this.room = room;
        this.gamAdventage = gamAdventage;
        this.wait = wait;
        this.max = max;
        this.players = new Array<Player>();
        this.players.push(new Player());
        this.players.push(new Player());
        this.turn = 0;
        this.sockets = new Array<Socket>();
    }

    room: string
    sockets: Socket[]
    turn: number;
    gamAdventage: number;
    wait: number;
    max: number;
    players: Player[];

    printfServerData() {
        console.log(this);
    }
}
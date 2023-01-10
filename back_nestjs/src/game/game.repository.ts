import { Injectable } from "@nestjs/common";
import { GameData } from "./game.util.ts/game.server";

@Injectable()
export class GameRepository {

    servers: GameData[];
    constructor() {
        this.servers = new Array<GameData>();
    }

    //return reference
    findByRoom(room: string){
        const found = this.servers.find((server) => server.room === room)
        if (found) 
            return found;
        else 
            return null;
    }

    async createGame(room:string, gamAdventage:number = 10 , wait: number = 8, max: number = 15) {
        let game: GameData = this.findByRoom(room);
        if (!game){
            game = new GameData(room, gamAdventage, wait, max)
            this.servers.push(game);
        }
        return game.room;
    }

    deleteRoom(room: string) {
        const idx = this.servers.findIndex(function(data) {return data.room === room});
        if (idx > -1) {
            this.servers.splice(idx, 1)
        }
    }
}
import { Injectable } from "@nestjs/common";
import { GameData } from "./game.util.ts/game.server";
import { Socket } from 'socket.io';
import { GAME_STATE } from '../util/utils'



@Injectable()
export class GameRepository {

    servers: GameData[];
    constructor() {
        this.servers = new Array<GameData>();
    }

    //return reference
    findByRoom(room: string) : GameData {
        const found = this.servers.find((server) => server.room === room)
        if (found) 
            return found;
        else 
            return null;
    }

    createGame(room:string, gamAdventage:number = 10 , wait: number = 8, max: number = 9, min: number = 3) : GameData{
        let game: GameData = this.findByRoom(room);
        if (!game){
            game = new GameData(room, gamAdventage, wait, max)
            this.servers.push(game);
        }
        return game;
    }

    deleteRoom(room: string) {
        const idx = this.servers.findIndex(function(data) {return data.room === room});
        if (idx > -1) {
            this.servers.splice(idx, 1)
        }
    }

	leaveRoom(room: string, client: Socket) : GameData {
		let room_data = this.findByRoom(room);
        const idx = room_data.sockets.findIndex(function(socket) {return socket.id === client.id}) // findIndex = find + indexOf
        if (idx > -1) 
            room_data.sockets.splice(idx, 1)
		return room_data;
	}

	setTurn(room: string, turn: number) {
		let room_data = this.findByRoom(room);
		room_data.turn = turn;
		room_data.roomState = GAME_STATE.FIRST_CARD_SELECT;
	}

	setRoomState(room: string, state: number) {
		this.findByRoom(room).roomState = state;
	}
}
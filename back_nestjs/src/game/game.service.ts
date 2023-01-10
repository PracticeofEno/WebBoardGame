import { HttpException, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { writeHeapSnapshot } from 'v8';
import { GameRepository } from './game.repository';
import { GameData } from './game.util.ts/game.server';

@Injectable()
export class GameService {

    constructor(
        private gameRepository : GameRepository,
        private authService: AuthService
    ){}

    async createGame(room: string) {
        return await this.gameRepository.createGame(room);
    }

    joinRoom(room: string, client: Socket) {
        this.gameRepository.findByRoom(room).sockets.push(client);
    }

    leaveRoom(room: string, client: Socket) {
        let room_data = this.gameRepository.findByRoom(room);
        const idx = room_data.sockets.findIndex(function(socket) {return socket.id === client.id}) // findIndex = find + indexOf
        if (idx > -1) 
            room_data.sockets.splice(idx, 1)
        if (room_data.sockets.length == 0) {
            this.gameRepository.deleteRoom(room_data.room);
        }
    }

    findByRoom(room: string){
        return this.gameRepository.findByRoom(room);
    }

    getRoomJwtCode(room: string) : Object{
        let roomData = this.gameRepository.findByRoom(room);
        if (!roomData)
            return null;
        let ret = this.authService.jwtSign({room: roomData.room});
        return ret;
    }

    async tmp() {
        this.gameRepository.servers.map( (value) => {
            console.log(value.room);
            console.log(value.sockets.length);
        })
    }
}

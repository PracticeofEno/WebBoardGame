import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { GameService } from './game.service';
import { GameData } from './game.util.ts/game.server';

@Controller('game')
export class GameController {
    constructor(
        private gameService : GameService,
    ){}

    @Get('/:room')
    async getRoomJwtCode(@Param('room') room){
        console.log(`room = ${room}`);
        return this.gameService.getRoomGuestJwtCode(room);
    }

    @Get('/tmp/haha')
    async tmp(){
        await this.gameService.tmp();
    }
    
    @Post('/')
    createGame(@Body('room') room) : GameData {
        return this.gameService.createGame(room);
    }
}

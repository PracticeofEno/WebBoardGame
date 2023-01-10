import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor(
        private gameService : GameService,
    ){}

    @Get('/:room')
    async getRoomJwtCode(@Param('room') room){
        console.log(`room = ${room}`);
        return this.gameService.getRoomJwtCode(room);
    }

    @Get('/tmp/haha')
    async tmp(){
        await this.gameService.tmp();
    }
    
    @Post('/')
    async createGame(@Body('room') room) {
        return await this.gameService.createGame(room);
    }
}

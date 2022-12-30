import { Controller } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor(
        private gameService : GameService
    ){}

    
    @Get('/')
    login(@Query("nickname") nickname: string, @Query("password") password :string) {
        let ret = this.userService.login(nickname, password);
        console.log(ret);
        return ret;
    }
}

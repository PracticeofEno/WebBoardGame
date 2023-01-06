import { Controller, Get, Post, Query, UseGuards, Request} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ){}


    

    @Post('/')
    addUser(@Query("nickname") nickname: string, @Query("password") password :string) {
        return this.userService.addUser(nickname, password);
    }

    
}

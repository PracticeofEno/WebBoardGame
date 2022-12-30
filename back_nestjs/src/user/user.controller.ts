import { Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService, 
    ){}

    @Get('/')
    login(@Query("nickname") nickname: string, @Query("password") password :string) {
        let ret = this.userService.login(nickname, password);
        console.log(ret);
        return ret;
    }

    @Post('/')
    addUser(@Query("nickname") nickname: string, @Query("password") password :string) {
        return this.userService.addUser(nickname, password);
    }
}

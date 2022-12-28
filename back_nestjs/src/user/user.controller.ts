import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService, 
    ){}

    @Get('/')
    login(@Query("email") email: string) {

    }
}

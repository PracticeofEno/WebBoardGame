import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
        private configService: ConfigService
    ){}
    guestNumber = 0;

    @Get('/guestToken')
    guestToken(@Query("nickname") nickname) {
        console.log(this.configService.get('JWT_TIME'));
        let payload = {id: "guest-" + nickname, tmp: "guest-" + nickname};
        let jwt = this.jwtService.sign(payload);
        console.log(jwt);
        return jwt;
    }

    async login(user: any) {

    }
}

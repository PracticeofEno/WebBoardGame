import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt";
import { User } from 'src/entity/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(nickname: string, pass: string): Promise<User> {
        const user = await this.userService.findByNickname(nickname);
        let compare = await bcrypt.compare(pass, user.password);
        if (user && compare) {
            return user;
        }
        return null;
    }

    async login(nickname: string, password: string) : Promise<string>{
        let user = await this.validateUser(nickname, password);
        if (user) {
            let payload = { id : user.id };
            const jwt = await this.jwtService.sign(payload);
            return jwt;
        }
        else {
            throw new HttpException("인증 실패", 401);
        }
    }

    
}
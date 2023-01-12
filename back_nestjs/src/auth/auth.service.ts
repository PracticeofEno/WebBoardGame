import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt";
import { User } from 'src/entity/user.entity';
import { generateRandomString } from 'src/util/utils';
import axios from 'axios';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private configService: ConfigService
	) { }

	async validateUser(nickname: string, pass: string): Promise<User> {
		const user = await this.userService.findByNickname(nickname);
		let compare = await bcrypt.compare(pass, user.password);
		if (user && compare) {
			return user;
		}
		return null;
	}

	async jwtVerify(token: string): Promise<Object> {
		try {
			const ret = await this.jwtService.verify(token, {
				secret: this.configService.get('JWT_SECRET')
			});
			return ret;
		} catch (e) {
			new HttpException("Token Expired Error", 409);
		}
	}

	async jwtSign(object: Object) {
		return await this.jwtService.sign(object);
	}

	async login(nickname: string, password: string): Promise<string> {
		let user = await this.validateUser(nickname, password);
		if (user) {
			let payload = { id : user.id, room: generateRandomString(10), host: true};
			const jwt = await this.jwtService.sign(payload);
			return jwt;
		}
		else {
			throw new HttpException("인증 실패", 401);
		}
	}

	async oauthLogin(access: string) {
		let user;
		let res;
		try {
			res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
				headers: {
					Authorization: `Bearer ` + access,
				},
			})
		}
		catch {
			throw new HttpException("access token is not valid", 400);
		}
		console.log(res.data.email);
		try {
			user = await this.userService.findByEmail(res.data.email);
		}
		catch {
			user = await this.userService.addUser(res.data.email, generateRandomString(10));
		}
		let payload = { id: user.id, room: generateRandomString(10), host: true };
		const jwt = await this.jwtService.sign(payload);
		return jwt;
	}
}
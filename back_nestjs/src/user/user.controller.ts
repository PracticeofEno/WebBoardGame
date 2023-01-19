import { Controller, Get, Post, Query, UseGuards, Request, Body, Param, Req} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PostAddUser } from 'src/api/entities/base.response';
import { JwtAuthGarud } from 'src/auth/jwt/jwt-auth.gaurd';
import { User } from 'src/entity/user.entity';
import { UserService } from "./user.service";

@Controller('user')
@ApiTags('User API')
export class UserController {
    constructor(
        private userService: UserService,
    ){}

    @Get("/:nickname")
    @ApiParam({
        name: 'nickname',
        required: true,
        description: 'nicknamed으로 검색',
    })
    @ApiOperation({ summary: '닉네임검색', description: '닉네임으로 된 유저가 있는지 찾아봄' })
    @ApiCreatedResponse({ description: '존재하는 유저 정보', type: User})
    async findUserByNickname(@Param('nickname') nickname) {
        return await this.userService.findByNickname(nickname);
    }

    @Post('/')
    @ApiBody({
        type: PostAddUser
    })
    @ApiOperation({ summary: 'User생성', description: '유저생성' })
    @ApiCreatedResponse({ description: '생성된 유저 정보', type: User})
    async addUser(@Body('nickname') nickname, @Body('password') password) : Promise<User> {
        return await this.userService.addUser(nickname, password);
    }

	@Get("/")
	@UseGuards(JwtAuthGarud)
	async getSelf(@Request() req) {
		return req.user;
	}

	@Post("/nickname")
	@UseGuards(JwtAuthGarud)
	async updateNickname(@Request() req, @Body('nickname') nickname) {
        return await this.userService.updateNickname(req.user.id, nickname);
    }
}

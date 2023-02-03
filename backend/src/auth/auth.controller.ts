import { Controller, Get, UseGuards, Request, Param } from '@nestjs/common';
import { Body, Post, Query } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { PostAddUser } from 'src/api/entities/base.response';
import { UserService } from 'src/user/user.service';


@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  guestNumber = 0;

  @Get('/guestToken/:nickname')
  @ApiParam({
    name: 'nickname',
    required: true,
    description: 'guest-nickname의 형태로 JWT만듬',
  })
  @ApiOperation({ summary: 'Guest토큰', description: 'Guest 토큰을 생성한다' })
  @ApiCreatedResponse({ description: 'JWT 토큰', type: String})
  guestToken(@Param('nickname') nickname) {
    console.log(this.configService.get('JWT_TIME'));
    let payload = { id: 'guest-' + nickname, tmp: 'guest-' + nickname };
    let jwt = this.jwtService.sign(payload);
    console.log(jwt);
    return jwt;
  }

  @Post('/login')
  @ApiBody({
    type: PostAddUser
  })
  @ApiOperation({ summary: '로그인', description: '성공시 유저id를 가진 jwt 반납' })
  @ApiCreatedResponse({ description: 'JWT 토큰', type: String})
  async login(@Body('id') id, @Body('password') password) {
    return await this.authService.login(id, password);
  }

  @Post('/oauth-login')
  @ApiBody({
    type: String,
    required: true,
  })
  @ApiOperation({ summary: '구글 로그인', description: 'access_token을 받아서 유효한 토큰이면 email을 id로 가진 jwt 반납' })
  @ApiCreatedResponse({ description: 'JWT 토큰', type: String})
  async oauthLogin(@Body('access') access) {
    return await this.authService.oauthLogin(access);
  }
}

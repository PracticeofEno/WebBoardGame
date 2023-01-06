import { Controller, Get, UseGuards, Request, Param } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiCreatedResponse } from '@nestjs/swagger';

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

  async login(user: any) {}
}

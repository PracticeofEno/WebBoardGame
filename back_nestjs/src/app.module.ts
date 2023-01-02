import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule, 
    GameModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  providers: [AuthService, UserService, JwtService]
})
export class AppModule {}

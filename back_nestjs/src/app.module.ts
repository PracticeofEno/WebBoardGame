import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ImagesModule } from './images/images.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule, 
    GameModule, 
    AuthModule,
    TypeOrmModule.forRoot(typeORMConfig),
    ImagesModule
  ],
  providers: []
})
export class AppModule {}

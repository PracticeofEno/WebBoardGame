import { Module } from '@nestjs/common';
import { GameGateWay } from 'src/gateway/game.gateway';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameRepository } from './game.repository'
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    AuthModule,
	UserModule,
  ],
  controllers: [GameController],
  providers: [GameService, GameGateWay, GameRepository],
  exports: [GameGateWay]
})
export class GameModule {}

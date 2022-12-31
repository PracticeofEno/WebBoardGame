import { Module } from '@nestjs/common';
import { GameGateWay } from 'src/gateway/game.gateway';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  controllers: [GameController],
  providers: [GameService, GameGateWay],
  exports: [GameGateWay]
})
export class GameModule {}

import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { gameProviders } from './game.provider';
import { DatabaseModule } from 'src/database/database.module';
import { TournamentModule } from 'src/tournament/tournament.module';

@Module({
  imports: [DatabaseModule, TournamentModule],
  controllers: [GameController],
  providers: [GameService, ...gameProviders],
  exports: [GameService, ...gameProviders]
})
export class GameModule {}

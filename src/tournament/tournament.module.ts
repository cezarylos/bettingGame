import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';
import { tournamenntProviders } from './tournament.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TournamentController],
  providers: [TournamentService, ...tournamenntProviders],
  exports: [TournamentService, ...tournamenntProviders]
})
export class TournamentModule {}

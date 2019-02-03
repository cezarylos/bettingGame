import { Module } from '@nestjs/common';
import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';
import { tournamentProviders } from './tournament.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [TournamentController],
  providers: [TournamentService, ...tournamentProviders],
  exports: [TournamentService, ...tournamentProviders]
})
export class TournamentModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TournamentModule } from './tournament/tournament.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [AuthModule, UsersModule, TournamentModule, GameModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

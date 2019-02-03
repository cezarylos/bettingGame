import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException
} from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentDto } from './dto/tournament.dto';
import { TournamentInterface } from './interfaces/tournament.interface';
import { ObjectId } from 'bson';
import { SignIntoTournamentDto } from './dto/signIntoTournament.dto';
import * as mongoose from 'mongoose';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post()
  async createTournament(
    @Body() tournamentDto: TournamentDto
  ): Promise<TournamentInterface> {
    return this.tournamentService.createTournament(tournamentDto);
  }

  @Get('all')
  async getAllTournaments(): Promise<TournamentInterface[]> {
    return this.tournamentService.getAllTournaments();
  }

  @Get(':id')
  async getTournamentById(
    @Param('id') id: ObjectId
  ): Promise<TournamentInterface> {
    return this.tournamentService.getTournamentById(id);
  }

  @Post('signIn')
  async signUserIntoTournament(
    @Body() signInData: SignIntoTournamentDto
  ): Promise<{}> {
    if (
      !mongoose.Types.ObjectId.isValid(signInData.tournamentId) ||
      !mongoose.Types.ObjectId.isValid(signInData.userId)
    ) {
      throw new HttpException('Error', 409);
    }
    return this.tournamentService.singUserIntoTournament(
      signInData.tournamentId,
      signInData.userId
    );
  }
}

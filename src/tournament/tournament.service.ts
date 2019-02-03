import { Injectable, Inject, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { TOURNAMENT_MODEL_TOKEN } from './tournament.constants';
import { TournamentInterface } from './interfaces/tournament.interface';
import { TournamentDto } from './dto/tournament.dto';
import { ObjectId } from 'bson';
import { UsersService } from '../users/users.service';

@Injectable()
export class TournamentService {
  constructor(
    @Inject(TOURNAMENT_MODEL_TOKEN)
    private readonly tournamentModel: Model<TournamentInterface>,
    private readonly usersService: UsersService
  ) {}

  async createTournament(
    tournamentDto: TournamentDto
  ): Promise<TournamentInterface> {
    const tournament = new this.tournamentModel(tournamentDto);
    await tournament.save();
    return tournament;
  }

  async getAllTournaments(): Promise<TournamentInterface[]> {
    return await this.tournamentModel
      .find()
      .populate('games', '-tournamentId')
      .populate('users', '-tournamentId')
      .exec();
  }

  async getTournamentById(id: ObjectId): Promise<TournamentInterface> {
    return await this.tournamentModel.findOne({ _id: id }).exec();
  }

  async singUserIntoTournament(
    tournamentId: ObjectId,
    userId: ObjectId
  ): Promise<TournamentInterface> {
    const tournament = await this.getTournamentById(tournamentId);
    const user = await this.usersService.findOneByParams({ _id: userId });
    if (!tournament || !user) {
      throw new HttpException('User or tournament not found', 409);
    }
    const userAlreadySignedIn = await tournament.users.find(
      oneUser => oneUser._id.toString() === userId
    );
    if (userAlreadySignedIn) {
      throw new HttpException('Cannot sign twice to the same tournament', 409);
    }
    tournament.users = [...tournament.users, user._id];
    user.placedTournaments = [...user.placedTournaments, {tournament, placedGames: []}];
    await tournament.save();
    await user.save();
    return await tournament;
  }
}

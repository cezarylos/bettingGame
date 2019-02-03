import { Injectable, Inject, HttpException } from '@nestjs/common';
import { GAME_MODEL_TOKEN, GAME } from './game.constants';
import { Model } from 'mongoose';
import { GameInterface } from './interfaces/game.interface';
import { GametDto } from './dto/game.dto';
import { TournamentService } from 'src/tournament/tournament.service';
import { ObjectId } from 'bson';
import { GameScoreInterface } from './interfaces/gameScore.interface';
import { UsersService } from '../users/users.service';
import { UserInterface } from '../users/interfaces/user.interface';
import { PlacedGameInterface } from '../tournament/interfaces/placed-torunament.interface';

@Injectable()
export class GameService {
  constructor(
    @Inject(GAME_MODEL_TOKEN) private readonly gameModel: Model<GameInterface>,
    private readonly tournamentService: TournamentService,
    private readonly usersService: UsersService
  ) {}

  async createGame(gameDto: GametDto): Promise<GameInterface> {
    const game = new this.gameModel(gameDto);
    const tournament = await this.tournamentService.getTournamentById(
      gameDto.tournamentId
    );
    tournament.games = [...tournament.games, game._id];
    await tournament.save();
    return await game.save();
  }

  async updateGameScore(
    id: ObjectId,
    score: GameScoreInterface
  ): Promise<GameInterface> {
    return await this.gameModel.updateOne(
      { _id: id },
      { $set: { homeScore: score.homeScore, awayScore: score.awayScore } }
    );
  }

  async getGameById(id: ObjectId): Promise<GameInterface> {
    return await this.gameModel.findById(id).exec();
  }

  async getAllGames(): Promise<GameInterface[]> {
    return await this.gameModel.find().exec();
  }

  async placeGame(userId: ObjectId, gameId: ObjectId): Promise<UserInterface> {
    const game = await this.getGameById(gameId);
    const user = await this.usersService.findOneByParams({ _id: userId });
    this.validateGamePlacement(game, user);
    const tournamentOfGame = user.placedTournaments.find(placedTournament => {
      if (!placedTournament.tournament) {
        return;
      }
      return game.tournamentId.toString() === placedTournament.tournament._id.toString();
    });
    const placedGameData: PlacedGameInterface = {
      gameId,
      betHomeScore: 9,
      betAwayScore: 4,
    };
    tournamentOfGame.placedGames = [...tournamentOfGame.placedGames, placedGameData];
    await user.save();
    return await user;
  }

  validateGamePlacement(game: GameInterface, user: UserInterface): void {
    if (!game || !user) {
      throw new HttpException('User or tournament not found', 409);
    }
    const tournamentOfGame = user.placedTournaments.find(placedTournament => {
      if (!placedTournament.tournament) {
        return;
      }
      return game.tournamentId.toString() === placedTournament.tournament._id.toString();
    });
    if (!tournamentOfGame) {
      throw new HttpException('User not signed into tournament of this game', 409);
    }
    const gameAlreadyPlaced = tournamentOfGame.placedGames.find(oneGame => oneGame.gameId.toString() === game._id.toString());
    if (gameAlreadyPlaced) {
      throw new HttpException('Cannot sign twice to the same game', 409);
    }
  }
}

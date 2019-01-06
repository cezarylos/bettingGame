import { Injectable, Inject } from '@nestjs/common';
import { GAME_MODEL_TOKEN } from './game.constants';
import { Model } from 'mongoose';
import { GameInterface } from './interfaces/game.interface';
import { GametDto } from './dto/game.dto';
import { TournamentService } from 'src/tournament/tournament.service';

@Injectable()
export class GameService {
    constructor(@Inject(GAME_MODEL_TOKEN) private readonly gameModel: Model<GameInterface>,
     private readonly tournamentService: TournamentService) {}

    async createGame(gameDto: GametDto): Promise<GameInterface> {
        const game = new this.gameModel(gameDto);
        const tournament = await this.tournamentService.getTournamentById(gameDto.tournamentId);
        tournament.games = [...tournament.games, game._id];
        await tournament.save()
        return await game.save();
    }

    async getAllGames(): Promise<GameInterface[]> {
        return await this.gameModel.find().exec()
    }
}

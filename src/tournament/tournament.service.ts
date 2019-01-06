import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose'
import { TOURNAMENT_MODEL_TOKEN } from './tournament.constants';
import { TournamentInterface } from './interfaces/tournament.interface';
import { TournamentDto } from './dto/tournament.dto';
import { ObjectId } from 'bson';

@Injectable()
export class TournamentService {
    constructor(@Inject(TOURNAMENT_MODEL_TOKEN) private readonly tournamentModel: Model<TournamentInterface>) {}

    async createTournament(tournamentDto: TournamentDto): Promise<TournamentInterface> {
        const tournament = new this.tournamentModel(tournamentDto);
        await tournament.save();
        return tournament;
    }

    async getAllTournaments(): Promise<TournamentInterface[]> {
        return await this.tournamentModel.find().populate('games', '-tournamentId').exec();
    }

    async getTournamentById(id: ObjectId): Promise<TournamentInterface> {
        return await this.tournamentModel.findOne({_id: id}).exec();
    }
}

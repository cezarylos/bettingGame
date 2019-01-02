import { Document } from 'mongoose'
import { GameInterface } from 'src/game/interfaces/game.interface';

export interface TournamentInterface extends Document {
    readonly name: string;
    readonly description: string;
    readonly startTime: number;
    games: GameInterface[];
}
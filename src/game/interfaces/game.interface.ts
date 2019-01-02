import { Document } from 'mongoose'
import { ObjectId } from 'bson';

export interface GameInterface extends Document {
    readonly homeTeam: string,
    readonly awayTeam: string,
    readonly description: string;
    readonly startTime: number;
    readonly tournamentId: ObjectId;
}
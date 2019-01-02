import * as mongoose from 'mongoose'
import { GAME } from 'src/game/game.constants';

export const TournamentSchema = new mongoose.Schema({
    name: String,
    description: String,
    startTime: Number,
    games: [
        {
            ref: GAME,
            type: String
        }
    ]
})
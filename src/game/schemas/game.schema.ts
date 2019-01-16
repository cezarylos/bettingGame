import * as mongoose from 'mongoose'

export const GameSchema = new mongoose.Schema({
    homeTeam: String,
    awayTeam: String,
    description: String,
    startTime: Number,
    tournamentId: String,
    homeScore: Number,
    awayScore: Number
})
import * as mongoose from 'mongoose';
import { TOURNAMENT } from '../../tournament/tournament.constants';
import { ObjectId } from 'bson';
import { TournamentSchema } from '../../tournament/schemas/tournament.schema';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  tournaments: [
    {
      ref: TOURNAMENT,
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  placedTournaments: [
    {
      tournament: TournamentSchema,
      placedGames: [
        {
          gameId: ObjectId,
          points: Number,
          betHomeScore: Number,
          betAwayScore: Number,
        },
      ],
    },
  ],
});

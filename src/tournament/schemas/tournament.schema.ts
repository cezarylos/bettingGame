import * as mongoose from 'mongoose';
import { GAME } from 'src/game/game.constants';
import { USER } from '../../users/users.constants';

export const TournamentSchema = new mongoose.Schema({
  name: String,
  description: String,
  startTime: Number,
  games: [
    {
      ref: GAME,
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  users: [
    {
      ref: USER,
      type: mongoose.Schema.Types.ObjectId
    }
  ]
});

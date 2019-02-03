import { ObjectId } from 'bson';
import { TournamentInterface } from './tournament.interface';

export interface PlacedTournamentInterface {
  tournament: TournamentInterface;
  placedGames: PlacedGameInterface[];
}

export interface PlacedGameInterface {
  gameId: ObjectId;
  betHomeScore: number;
  betAwayScore: number;
  points?: number;
}
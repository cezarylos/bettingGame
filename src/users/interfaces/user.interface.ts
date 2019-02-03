import { Document } from 'mongoose';
import { PlacedTournamentInterface } from '../../tournament/interfaces/placed-torunament.interface';

export interface UserInterface extends Document {
  readonly email?: string;
  password?: string;
  placedTournaments?: PlacedTournamentInterface[];
}

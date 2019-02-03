import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'bson';

export class SignIntoTournamentDto {
  @IsNotEmpty()
  readonly tournamentId: ObjectId;

  @IsNotEmpty()
  readonly userId: ObjectId;
}

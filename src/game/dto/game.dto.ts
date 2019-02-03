import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'bson';

export class GametDto {
  @IsNotEmpty()
  readonly tournamentId: ObjectId;

  @IsNotEmpty()
  readonly homeTeam: string;

  @IsNotEmpty()
  readonly awayTeam: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly startTime: number;

  homeScore: number;

  awayScore: number;
}

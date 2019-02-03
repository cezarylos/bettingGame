import { IsNotEmpty } from 'class-validator';
import { UserInterface } from '../../users/interfaces/user.interface';

export class TournamentDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly startTime: number;

  users: UserInterface[];
}

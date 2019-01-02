import { IsNotEmpty } from 'class-validator';

export class TournamentDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly startTime: number;
}
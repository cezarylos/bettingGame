import { Connection } from 'mongoose'
import { DB_CONNECTION_TOKEN } from "src/database/database.constants";
import { TOURNAMENT_MODEL_TOKEN, TOURNAMENT } from './tournament.constants';
import { TournamentSchema } from './schemas/tournament.schema';

export const tournamenntProviders = [
    {
        provide: TOURNAMENT_MODEL_TOKEN,
        useFactory: (connection: Connection) => connection.model(TOURNAMENT, TournamentSchema),
        inject: [DB_CONNECTION_TOKEN]
    }
]
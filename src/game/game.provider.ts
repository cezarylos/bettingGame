import { Connection } from 'mongoose'
import { DB_CONNECTION_TOKEN } from "src/database/database.constants";
import { GAME_MODEL_TOKEN, GAME } from './game.constants';
import { GameSchema } from './schemas/game.schema';

export const gameProviders = [
    {
        provide: GAME_MODEL_TOKEN,
        useFactory: (connection: Connection) => connection.model(GAME, GameSchema),
        inject: [DB_CONNECTION_TOKEN]
    }
]
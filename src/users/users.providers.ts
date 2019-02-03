import { Connection } from 'mongoose';
import { DB_CONNECTION_TOKEN } from 'src/database/database.constants';
import { UserSchema } from './schemas/user.schema';
import { USER_MODEL_TOKEN, USER } from './users.constants';

export const usersProviders = [
  {
    provide: USER_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model(USER, UserSchema),
    inject: [DB_CONNECTION_TOKEN]
  }
];

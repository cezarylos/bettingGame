import * as mongoose from 'mongoose';
import { DB_CONNECTION_TOKEN } from './database.constants'

export const databaseProviders = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async (): Promise<typeof mongoose> => 
      await mongoose.connect('mongodb://cezlos:Qweasd123*@ds127321.mlab.com:27321/betting-game', { useNewUrlParser: true }),
  }
];
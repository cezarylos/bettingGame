import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> => 
      await mongoose.connect('mongodb://cezlos:losiek4@ds127321.mlab.com:27321/betting-game', { useNewUrlParser: true }),
  }
];
import { UserSchema } from "./schemas/user.schema";
import { Connection } from 'mongoose'

export const authProviders = [
    {
        provide: 'UserModelToken',
        useFactory: (connection: Connection) => connection.model('User', UserSchema),
        inject: ['DbConnectionToken']
    }
]
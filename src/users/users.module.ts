import { Module } from '@nestjs/common';
import { usersProviders } from './users.providers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService, ...usersProviders]
})
export class UsersModule {}

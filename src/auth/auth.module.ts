import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose'
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { authProviders } from "./auth.providers";
import { DatabaseModule } from "src/database/database.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStategy } from "./jwt.strategy";

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
        secretOrPrivateKey: 'secretKey',
        signOptions: {
          expiresIn: 3600,
        },
      })],
    controllers: [AuthController],
    providers: [AuthService, ...authProviders, JwtStategy]
})
export class AuthModule {}
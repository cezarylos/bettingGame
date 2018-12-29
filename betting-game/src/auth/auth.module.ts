import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from "./schemas/user.schema";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { authProviders } from "./auth.providers";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [AuthController],
    providers: [AuthService, ...authProviders]
})
export class AuthModule {}
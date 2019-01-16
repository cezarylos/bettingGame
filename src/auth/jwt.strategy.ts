import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from "./auth.service";
import { JwtPayloadInterface } from "./interfaces/jwt-payload.interface";
import {UserInterface} from "../users/interfaces/user.interface"

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey',
          });
    }

    async validate(payload: JwtPayloadInterface): Promise<UserInterface> {
        const validatedUser = await this.authService.validateUser(payload);
        if (!validatedUser) {
            throw new UnauthorizedException();
        }
        return validatedUser;
    }
}
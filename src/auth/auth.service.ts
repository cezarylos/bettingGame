import { Model } from 'mongoose'
import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { RegisterUserDto } from "./dto/register-user.dto";
import { JwtService } from '@nestjs/jwt'
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface'
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt'
import { USER_MODEL_TOKEN } from 'src/users/users.constants';
import { UserInterface } from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthService {
    constructor(@Inject(USER_MODEL_TOKEN) private readonly authUserModel: Model<UserInterface>,
                private readonly jwtService: JwtService) {}

    async register(registerUserDto: RegisterUserDto): Promise<UserInterface> {
        const registeredUser = new this.authUserModel(registerUserDto);
        await bcrypt.hash(registeredUser.password, 10).then(hash => registeredUser.password = hash);
        return await registeredUser.save();
    }

    async signIn(loginUserDto: LoginUserDto): Promise<{token: string}> {
        return await this.findUserWithPassword({email: loginUserDto.email})
        .then(async user => {
            if (!user) {
                throw new UnauthorizedException()                
            }
            return await bcrypt.compare(loginUserDto.password, user.password).then(isValid => { 
                if (isValid) {
                    const signedUser = {email: user.email, password: user.password} as UserInterface
                    return {token: this.jwtService.sign(signedUser)}
                } else {
                    throw new UnauthorizedException()
                }
            }, () => {
                throw new UnauthorizedException()
            })
        })
    }

    async findUserWithPassword(params: {email: string}): Promise<UserInterface> {
        return await this.authUserModel.findOne(params).exec()
    }

    async validateUser(payload: JwtPayloadInterface): Promise<UserInterface> {
        return await this.findUserWithPassword({email: payload.email})
        .then(async user => {
            if (!user) {
                throw new UnauthorizedException()                
            }
            if (payload.password === user.password) {
                return user;
             } else {
                 throw new UnauthorizedException()
             }
        })
    }
}
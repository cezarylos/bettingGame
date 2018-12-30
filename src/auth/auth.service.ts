import { Model } from 'mongoose'
import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { UserInterface } from "./interfaces/user.interface";
import { RegisterUserDto } from "./dto/register-user.dto";
import { JwtService } from '@nestjs/jwt'
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface'
import { FindUserByParams } from './interfaces/find-user-by-params.interface';
import { HttpException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(@Inject('UserModelToken') private readonly userModel: Model<UserInterface>,
                private readonly jwtService: JwtService) {}

    async register(registerUserDto: RegisterUserDto): Promise<UserInterface> {
        const registeredUser = new this.userModel(registerUserDto);
        await bcrypt.hash(registeredUser.password, 10).then(hash => registeredUser.password = hash);
        return await registeredUser.save();
    }

    async signIn(loginUserDto: LoginUserDto): Promise<{token: string}> {
        return await this.findOneByParams({email: loginUserDto.email})
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

    async findOneByParams(params: FindUserByParams): Promise<UserInterface> | null {
        return await this.userModel.findOne(params).exec()
    }

    async findAll(): Promise<UserInterface[]> {
        return await this.userModel.find().exec();
      }

    async validateUser(payload: JwtPayloadInterface): Promise<UserInterface> {
        return await this.findOneByParams({email: payload.email});
    }
}
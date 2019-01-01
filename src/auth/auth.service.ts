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
        const user = await this.findUserWithPassword({email: loginUserDto.email})
        if (!user) {
            throw new UnauthorizedException()  
        }
        const isValid = await bcrypt.compare(loginUserDto.password, user.password);
        const signedUser = {email: user.email, _id: user._id} as UserInterface
        if (!isValid) {
            throw new UnauthorizedException();
        }
        return {token: this.jwtService.sign(signedUser)}
    }

    async findUserWithPassword(params: {email: string}): Promise<UserInterface> {
        return await this.authUserModel.findOne(params).exec()
    }

    async validateUser(payload: JwtPayloadInterface): Promise<UserInterface> {
        const user = await this.findUserWithPassword({email: payload.email})
        if (!user) {
            throw new UnauthorizedException()                
        }
        const userSignedIn = payload.email === user.email && payload._id === user._id.toString()
        if (!userSignedIn) {
            throw new UnauthorizedException()                
        }
        return user;
    }
}
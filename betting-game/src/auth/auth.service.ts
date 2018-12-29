import { Model } from 'mongoose'
import { Injectable, Inject } from "@nestjs/common";
import { UserInterface } from "./interfaces/user.interface";
import { RegisterUserDto } from "./dto/register-user.dto";

@Injectable()
export class AuthService {
    constructor(@Inject('UserModelToken') private readonly userModel: Model<UserInterface>) {}

    async register(registerUserDto: RegisterUserDto): Promise<UserInterface> {
        const registeredUser = new this.userModel(registerUserDto);
        console.log(registeredUser);
        return await registeredUser.save();
    }

    async findAll(): Promise<UserInterface[]> {
        return await this.userModel.find().exec();
      }
}
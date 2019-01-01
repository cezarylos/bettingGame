import { Model } from 'mongoose'
import { Injectable, Inject } from "@nestjs/common";
import { FindUserByParams } from './interfaces/find-user-by-params.interface';
import { USER_MODEL_TOKEN } from './users.constants';
import { UserInterface } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(@Inject(USER_MODEL_TOKEN) private readonly userModel: Model<UserInterface>) {}

    async findOneByParams(params: FindUserByParams): Promise<UserInterface> {
        return await this.userModel.findOne(params).exec()
    }

    async findAll(): Promise<UserInterface[]> {
        return await this.userModel.find().exec();
    }
}
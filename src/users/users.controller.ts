import { Controller, Get, UseGuards } from "@nestjs/common";
import { Query } from "@nestjs/common";
import { FindUserByParams } from "./interfaces/find-user-by-params.interface";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "./users.service";
import { UserInterface } from "./interfaces/user.interface";

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('users')
    @UseGuards(AuthGuard())
    async findUserByEmail(@Query() params: FindUserByParams): Promise<UserInterface | UserInterface[]> {
        if (Object.keys(params).length) {
            return this.usersService.findOneByParams(params);
        }
        return this.usersService.findAll();
    }
    
}
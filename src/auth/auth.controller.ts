import { Controller, Post, Body, Get, HttpCode, UseGuards, HttpException } from "@nestjs/common";
import { RegisterUserDto } from "./dto/register-user.dto";
import { AuthService } from "./auth.service";
import { UserInterface } from "./interfaces/user.interface";
import { Query } from "@nestjs/common";
import { FindUserByParams } from "./interfaces/find-user-by-params.interface";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    async registerUser(@Body() registerUserDto: RegisterUserDto) {
        const userExists = await this.authService.findOneByParams({email: registerUserDto.email});
        if (userExists) {
            throw new HttpException('User already exists', 409)         
        }
        this.authService.register(registerUserDto);
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginUserDto: LoginUserDto): Promise<{token: string}> {
        return this.authService.signIn(loginUserDto)
    }

    @Get('users')
    @UseGuards(AuthGuard())
    async findUserByEmail(@Query() params: FindUserByParams): Promise<UserInterface | UserInterface[]> {
        if (Object.keys(params).length) {
            return this.authService.findOneByParams(params);
        }
        return this.authService.findAll();
    }
    
}
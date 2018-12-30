import { Controller, Post, Body, HttpCode, HttpException } from "@nestjs/common";
import { RegisterUserDto } from "./dto/register-user.dto";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    async registerUser(@Body() registerUserDto: RegisterUserDto) {
        const userExists = await this.authService.findUserWithPassword({email: registerUserDto.email});
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
}
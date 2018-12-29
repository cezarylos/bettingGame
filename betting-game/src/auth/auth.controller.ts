import { Controller, Post, Body, Get } from "@nestjs/common";
import { RegisterUserDto } from "./dto/register-user.dto";
import { AuthService } from "./auth.service";
import { UserInterface } from "./interfaces/user.interface";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    async registerUser(@Body() registerUserDto: RegisterUserDto) {
        this.authService.register(registerUserDto);
    }

    @Get('users')
    async findAll(): Promise<UserInterface[]> {
        return this.authService.findAll();
    }
    
}
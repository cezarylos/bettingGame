import { Controller, Get, Post, Body } from '@nestjs/common';
import { GameService } from './game.service';
import { GameInterface } from './interfaces/game.interface';
import { GametDto } from './dto/game.dto';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Post()
    async createGame(@Body() gameDto: GametDto): Promise<GameInterface> {
        return this.gameService.createGame(gameDto);
    }

    @Get('all')
    async getAllGames(): Promise<GameInterface[]> {
        return this.gameService.getAllGames();
    }
}

import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { GameService } from './game.service';
import { GameInterface } from './interfaces/game.interface';
import { GametDto } from './dto/game.dto';
import { ObjectId } from 'bson';
import { GameScoreInterface } from './interfaces/gameScore.interface';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Post()
    async createGame(@Body() gameDto: GametDto): Promise<GameInterface> {
        return this.gameService.createGame(gameDto);
    }

    @Put(':id')
    async updateGameScore(@Param('id') id: ObjectId, @Body() score: GameScoreInterface): Promise<GameInterface> {
        return this.gameService.updateGameScore(id, score);
    }

    @Get(':id')
    async getGameById(@Param('id') id: ObjectId): Promise<GameInterface> {
        return this.gameService.getGameById(id);
    }

    @Get('all')
    async getAllGames(): Promise<GameInterface[]> {
        return this.gameService.getAllGames();
    }
}

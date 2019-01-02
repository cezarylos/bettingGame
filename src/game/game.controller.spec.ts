import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';

describe('Game Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [GameController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: GameController = module.get<GameController>(GameController);
    expect(controller).toBeDefined();
  });
});

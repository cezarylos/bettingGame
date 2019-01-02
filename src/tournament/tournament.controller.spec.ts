import { Test, TestingModule } from '@nestjs/testing';
import { TournamentController } from './tournament.controller';

describe('Tournaments Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TournamentController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: TournamentController = module.get<TournamentController>(TournamentController);
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CardSetsService } from './card-sets.service';

describe('CardSetsService', () => {
  let service: CardSetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardSetsService],
    }).compile();

    service = module.get<CardSetsService>(CardSetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

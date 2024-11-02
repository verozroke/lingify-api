import { Test, TestingModule } from "@nestjs/testing";
import { CardSetsController } from "./card-sets.controller";
import { CardSetsService } from "./card-sets.service";

describe("CardSetsController", () => {
  let controller: CardSetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardSetsController],
      providers: [CardSetsService],
    }).compile();

    controller = module.get<CardSetsController>(CardSetsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

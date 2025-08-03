import { Test, TestingModule } from "@nestjs/testing";
import { CardSetsController } from "./card-sets.controller";
import { CardSetsService } from "./card-sets.service";
import { PrismaService } from "prisma/prisma.service";

describe("CardSetsController", () => {
  let controller: CardSetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardSetsController],
      providers: [CardSetsService, { provide: PrismaService, useValue: {} }],
    }).compile();

    controller = module.get<CardSetsController>(CardSetsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

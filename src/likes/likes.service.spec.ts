import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";
import { LikesService } from "./likes.service";
import { PrismaService } from "prisma/prisma.service";

jest.mock(
  "prisma/prisma.service",
  () => ({ PrismaService: jest.fn() }),
  { virtual: true }
);

describe("LikesService", () => {
  let service: LikesService;
  let prisma: { like: { create: jest.Mock; findUnique: jest.Mock } };
  let res: { send: jest.Mock };

  beforeEach(async () => {
    prisma = {
      like: {
        create: jest.fn(),
        findUnique: jest.fn(),
      },
    };

    res = { send: jest.fn((body) => body) };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikesService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<LikesService>(LikesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("create should return the persisted like", async () => {
    const dto = { userId: "user1", postId: "post1" };
    const like = {
      id: "1",
      userId: "user1",
      postId: "post1",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    prisma.like.create.mockResolvedValue(like);

    const result = await service.create({} as any, res as any, dto);

    expect(prisma.like.create).toHaveBeenCalledWith({ data: dto });
    expect(res.send).toHaveBeenCalledWith(JSON.stringify(like));
    expect(result).toBe(JSON.stringify(like));
  });

  it("findOne should throw BadRequestException for non-existent id", async () => {
    prisma.like.findUnique.mockResolvedValue(null);

    await expect(
      service.findOne({} as any, res as any, "missing-id")
    ).rejects.toThrow(BadRequestException);
  });
});

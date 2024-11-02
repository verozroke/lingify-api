import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCardSetDto } from "./dto/create-card-set.dto";
import { UpdateCardSetDto } from "./dto/update-card-set.dto";
import { Request, Response } from "express";
import { PrismaService } from "prisma/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class CardSetsService {
  constructor(private prisma: PrismaService) {}
  async create(
    req: Request,
    res: Response,
    createCardSetDto: CreateCardSetDto
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: createCardSetDto.ownerId,
      },
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const cardSet = await this.prisma.cardSet.create({
      data: createCardSetDto,
    });

    return res.send(JSON.stringify(cardSet));
  }

  async findAll(req: Request, res: Response) {
    const cardSets = await this.prisma.cardSet.findMany();
    return res.send(JSON.stringify(cardSets));
  }

  async findAllByOwnerId(req: Request, res: Response, ownerId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: ownerId,
      },
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const cardSets = await this.prisma.cardSet.findMany({
      where: {
        ownerId,
      },
    });

    return res.send(JSON.stringify(cardSets));
  }

  async findOne(req: Request, res: Response, id: string) {
    const cardSet = await this.prisma.cardSet.findUnique({
      where: {
        id,
      },
    });

    if (!cardSet) {
      throw new BadRequestException("Card Set not found");
    }

    return res.send(JSON.stringify(cardSet));
  }

  async update(
    req: Request,
    res: Response,
    id: string,
    updateCardSetDto: UpdateCardSetDto
  ) {
    const isCardSetExists = !!(await this.prisma.cardSet.findUnique({
      where: {
        id,
      },
    }));

    if (!isCardSetExists) {
      throw new BadRequestException("Card Set not found");
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: updateCardSetDto.ownerId,
      },
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const isUserOwnsCardSet = !!(await this.prisma.cardSet.findUnique({
      where: {
        id,
        ownerId: updateCardSetDto.ownerId,
      },
    }));

    if (!isUserOwnsCardSet) {
      throw new BadRequestException(
        "You can't update card set that you does not own"
      );
    }

    const cardSet = await this.prisma.cardSet.update({
      data: updateCardSetDto,
      where: {
        id,
        ownerId: updateCardSetDto.ownerId,
      },
    });

    return res.send(JSON.stringify(cardSet));
  }

  async remove(req: Request, res: Response, id: string) {
    const isCardSetExists = !!(await this.prisma.cardSet.findUnique({
      where: {
        id,
      },
    }));

    if (!isCardSetExists) {
      throw new BadRequestException("Card Set not found");
    }

    const { id: ownerId } = req.user as User;

    const user = await this.prisma.user.findUnique({
      where: {
        id: ownerId,
      },
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const cardSet = await this.prisma.cardSet.findUnique({
      where: {
        id,
        ownerId: ownerId,
      },
    });

    if (!cardSet) {
      throw new BadRequestException(
        "You can't remove card set that you does not own"
      );
    }

    await this.prisma.cardSet.delete({
      where: {
        id,
        ownerId: ownerId,
      },
    });

    return res.send({ message: "Card Set successfully deleted" });
  }
}

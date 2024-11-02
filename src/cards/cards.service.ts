import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { Request, Response } from "express";
import { PrismaService } from "prisma/prisma.service"; // Make sure the path is correct
import { User } from "@prisma/client"; // Import User model if you have one
import { UploadAvatarDto } from "./dto/upload-avatar.dto";

@Injectable()
export class CardsService {
  constructor(private prisma: PrismaService) {}

  async create(req: Request, res: Response, createCardDto: CreateCardDto) {
    const { id: ownerId } = req.user as User;

    const user = await this.prisma.user.findUnique({
      where: {
        id: ownerId,
      },
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const isCardSetExists = !!(await this.prisma.cardSet.findUnique({
      where: {
        id: createCardDto.cardSetId,
      },
    }));

    if (!isCardSetExists) {
      throw new BadRequestException("Card Set not found");
    }

    const isUserOwnsCardSet = !!(await this.prisma.cardSet.findUnique({
      where: {
        id: createCardDto.cardSetId,
        ownerId: ownerId,
      },
    }));

    if (!isUserOwnsCardSet) {
      throw new BadRequestException(
        "You can't update a card set that you does not own"
      );
    }

    const card = await this.prisma.card.create({
      data: createCardDto,
    });

    return res.send(JSON.stringify(card));
  }

  async findAll(req: Request, res: Response) {
    const cards = await this.prisma.card.findMany();
    return res.send(JSON.stringify(cards));
  }

  async findAllByCardSetId(req: Request, res: Response, cardSetId: string) {
    const isCardSetExists = !!(await this.prisma.cardSet.findUnique({
      where: {
        id: cardSetId,
      },
    }));

    if (!isCardSetExists) {
      throw new BadRequestException("Card Set not found");
    }

    const cards = await this.prisma.card.findMany({
      where: {
        cardSetId,
      },
    });
    return res.send(JSON.stringify(cards));
  }

  async findOne(req: Request, res: Response, id: string) {
    const card = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      throw new BadRequestException("Card not found");
    }

    return res.send(JSON.stringify(card));
  }

  async update(
    req: Request,
    res: Response,
    id: string,
    updateCardDto: UpdateCardDto
  ) {
    const { id: ownerId } = req.user as User;

    const isCardSetExists = !!(await this.prisma.cardSet.findUnique({
      where: {
        id: updateCardDto.cardSetId,
      },
    }));

    if (!isCardSetExists) {
      throw new BadRequestException("Card Set not found");
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: ownerId,
      },
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const isUserOwnsCardSet = !!(await this.prisma.cardSet.findUnique({
      where: {
        id: updateCardDto.cardSetId,
        ownerId: ownerId,
      },
    }));

    if (!isUserOwnsCardSet) {
      throw new BadRequestException(
        "You can't update a card in the card set that you does not own"
      );
    }

    const card = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      throw new BadRequestException("Card not found");
    }

    const updatedCard = await this.prisma.card.update({
      where: { id },
      data: updateCardDto,
    });

    return res.send(JSON.stringify(updatedCard));
  }

  async remove(req: Request, res: Response, id: string) {
    const card = await this.prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      throw new BadRequestException("Card not found");
    }

    const isCardSetExists = !!(await this.prisma.cardSet.findUnique({
      where: {
        id: card.cardSetId,
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
        id: card.cardSetId,
        ownerId: ownerId,
      },
    });

    if (!cardSet) {
      throw new BadRequestException(
        "You can't remove card set that you does not own"
      );
    }

    await this.prisma.card.delete({
      where: { id },
    });

    return res.send({ message: "Card successfully deleted" });
  }

  async uploadAvatar(
    req: Request,
    res: Response,
    id: string,
    body: UploadAvatarDto
  ) {
    // TODO: make upload of the avatar
  }
}

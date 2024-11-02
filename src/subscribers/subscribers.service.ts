import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateSubscriberDto } from "./dto/create-subscriber.dto";
import { UpdateSubscriberDto } from "./dto/update-subscriber.dto";
import { Request, Response } from "express";
import { PrismaService } from "prisma/prisma.service"; // Adjust the import path as necessary

@Injectable()
export class SubscribersService {
  constructor(private prisma: PrismaService) {}

  async create(
    req: Request,
    res: Response,
    createSubscriberDto: CreateSubscriberDto
  ) {
    const subscriber = await this.prisma.subscriber.create({
      data: createSubscriberDto,
    });

    return res.send(JSON.stringify(subscriber));
  }

  async findAll(req: Request, res: Response) {
    const subscribers = await this.prisma.subscriber.findMany();
    return res.send(JSON.stringify(subscribers));
  }

  async findOne(req: Request, res: Response, id: string) {
    const subscriber = await this.prisma.subscriber.findUnique({
      where: { id },
    });

    if (!subscriber) {
      throw new BadRequestException("Subscriber not found");
    }

    return res.send(JSON.stringify(subscriber));
  }

  async update(
    req: Request,
    res: Response,
    id: string,
    updateSubscriberDto: UpdateSubscriberDto
  ) {
    const subscriber = await this.prisma.subscriber.update({
      where: { id },
      data: updateSubscriberDto,
    });

    return res.send(JSON.stringify(subscriber));
  }

  async remove(req: Request, res: Response, id: string) {
    await this.prisma.subscriber.delete({
      where: { id },
    });

    return res.send({ message: "Subscriber successfully deleted" });
  }
}

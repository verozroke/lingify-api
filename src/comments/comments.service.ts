import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Request, Response } from "express";
import { PrismaService } from "prisma/prisma.service"; // Adjust the import path as necessary

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(
    req: Request,
    res: Response,
    createCommentDto: CreateCommentDto
  ) {
    const comment = await this.prisma.comment.create({
      data: createCommentDto,
    });

    return res.send(JSON.stringify(comment));
  }

  async findAll(req: Request, res: Response) {
    const comments = await this.prisma.comment.findMany();
    return res.send(JSON.stringify(comments));
  }

  async findOne(req: Request, res: Response, id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new BadRequestException("Comment not found");
    }

    return res.send(JSON.stringify(comment));
  }

  async update(
    req: Request,
    res: Response,
    id: string,
    updateCommentDto: UpdateCommentDto
  ) {
    const comment = await this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });

    return res.send(JSON.stringify(comment));
  }

  async remove(req: Request, res: Response, id: string) {
    await this.prisma.comment.delete({
      where: { id },
    });

    return res.send({ message: "Comment successfully deleted" });
  }
}

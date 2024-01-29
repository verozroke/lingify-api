import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service'; // Adjust the import path as necessary

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) { }

  async create(req: Request, res: Response, createPostDto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: createPostDto
    });

    return res.send(JSON.stringify(post));
  }

  async findAll(req: Request, res: Response) {
    const posts = await this.prisma.post.findMany();
    return res.send(JSON.stringify(posts));
  }

  async findOne(req: Request, res: Response, id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    return res.send(JSON.stringify(post));
  }

  async update(req: Request, res: Response, id: string, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.update({
      where: { id },
      data: updatePostDto
    });

    return res.send(JSON.stringify(post));
  }

  async remove(req: Request, res: Response, id: string) {
    await this.prisma.post.delete({
      where: { id }
    });

    return res.send({ message: 'Post successfully deleted' });
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service'; // Adjust the import path as necessary

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) { }

  async create(req: Request, res: Response, createLessonDto: CreateLessonDto) {
    const lesson = await this.prisma.lesson.create({
      data: createLessonDto
    });

    return res.send(JSON.stringify(lesson));
  }

  async findAll(req: Request, res: Response) {
    const lessons = await this.prisma.lesson.findMany();
    return res.send(JSON.stringify(lessons));
  }

  async findOne(req: Request, res: Response, id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id }
    });

    if (!lesson) {
      throw new BadRequestException('Lesson not found');
    }

    return res.send(JSON.stringify(lesson));
  }

  async update(req: Request, res: Response, id: string, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.prisma.lesson.update({
      where: { id },
      data: updateLessonDto
    });

    return res.send(JSON.stringify(lesson));
  }

  async remove(req: Request, res: Response, id: string) {
    await this.prisma.lesson.delete({
      where: { id }
    });

    return res.send({ message: 'Lesson successfully deleted' });
  }
}

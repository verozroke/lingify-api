import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service'; // Adjust the import path as necessary

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) { }

  async create(req: Request, res: Response, createCourseDto: CreateCourseDto) {
    const course = await this.prisma.course.create({
      data: createCourseDto
    });

    return res.send(JSON.stringify(course));
  }

  async findAll(req: Request, res: Response) {
    const courses = await this.prisma.course.findMany();
    return res.send(JSON.stringify(courses));
  }

  async findOne(req: Request, res: Response, id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id }
    });

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    return res.send(JSON.stringify(course));
  }


  async findOneByName(req: Request, res: Response, courseName: string) {
    const course = await this.prisma.course.findFirst({
      where: {
        name: courseName
      },
      include: {
        avatar: true,
        lessons: {
          include: {
            materials: true
          }
        }
      }
    });

    if (!course) {
      throw new BadRequestException('Course not found');
    }

    return res.send(JSON.stringify(course));
  }


  async update(req: Request, res: Response, id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.prisma.course.update({
      where: { id },
      data: updateCourseDto
    });

    return res.send(JSON.stringify(course));
  }

  async remove(req: Request, res: Response, id: string) {
    await this.prisma.course.delete({
      where: { id }
    });

    return res.send({ message: 'Course successfully deleted' });
  }
}

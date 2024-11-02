import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Request, Response } from "express";
import { PrismaService } from "prisma/prisma.service"; // Adjust the import path as necessary
import { ChatCompletionApiService } from "src/chat-completion-api/chat-completion-api.service";
import {
  CreateLessonsGetChatCompletionAnswerInputDTO,
  CreateMaterialsGetChatCompletionAnswerInputDTO,
} from "src/chat-completion-api/dto/chat-completion-answer.dto";

@Injectable()
export class CoursesService {
  constructor(
    private prisma: PrismaService,
    private chatAPI: ChatCompletionApiService
  ) {}

  async create(req: Request, res: Response, payload: CreateCourseDto) {
    const { courseLanguage, languageLevel, nativeLanguage, avatarId, userId } =
      payload;

    const course = await this.prisma.course.create({
      data: {
        name: `${courseLanguage} (${languageLevel})`,
        nativeLanguage,
        description: `Course of ${courseLanguage} in ${languageLevel} level.`,
        avatarId,
        userId,
      },
    });

    const lessonsPayload: CreateLessonsGetChatCompletionAnswerInputDTO = {
      courseLanguage,
      languageLevel,
      nativeLanguage,
    };

    const lessons = await this.chatAPI.createLessons(lessonsPayload);

    lessons.forEach(async ({ name, keyWords, description }) => {
      const lesson = await this.prisma.lesson.create({
        data: {
          name,
          keyWords,
          description,
          courseId: course.id,
        },
      });

      const materialsPayload: CreateMaterialsGetChatCompletionAnswerInputDTO = {
        courseName: course.name,
        lessonsName: lesson.name,
        lessonDescription: lesson.description,
        nativeLanguage,
        keyWords: lesson.keyWords,
      };

      const materials = await this.chatAPI.createMaterials(materialsPayload);

      materials.forEach(async ({ name, description }) => {
        await this.prisma.material.create({
          data: {
            name,
            description,
            lessonId: lesson.id,
          },
        });
      });
    });

    return res.send(JSON.stringify(course));
  }

  async findAll(req: Request, res: Response) {
    const courses = await this.prisma.course.findMany();
    return res.send(JSON.stringify(courses));
  }

  async findOne(req: Request, res: Response, id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new BadRequestException("Course not found");
    }

    return res.send(JSON.stringify(course));
  }

  async findOneByName(req: Request, res: Response, courseName: string) {
    const course = await this.prisma.course.findFirst({
      where: {
        name: courseName,
      },
      include: {
        avatar: true,
        lessons: {
          include: {
            materials: true,
          },
        },
      },
    });

    if (!course) {
      throw new BadRequestException("Course not found");
    }

    return res.send(JSON.stringify(course));
  }

  async update(
    req: Request,
    res: Response,
    id: string,
    updateCourseDto: UpdateCourseDto
  ) {
    const course = await this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });

    return res.send(JSON.stringify(course));
  }

  async remove(req: Request, res: Response, id: string) {
    await this.prisma.course.delete({
      where: { id },
    });

    return res.send({ message: "Course successfully deleted" });
  }
}

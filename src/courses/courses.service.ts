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
import { CreateCourseAsTeacherDto } from "./dto/create-course-as-teacher.dto";

@Injectable()
export class CoursesService {
  constructor(
    private prisma: PrismaService,
    private chatAPI: ChatCompletionApiService
  ) {}

  async create(req: Request, res: Response, payload: CreateCourseDto) {
    const { courseLanguage, languageLevel, nativeLanguage, avatarUrl, userId } =
      payload;

    const avatar = await this.prisma.image.create({
      data: {
        url: avatarUrl,
      },
    });

    const course = await this.prisma.course.create({
      data: {
        name: `${courseLanguage} (${languageLevel})`,
        nativeLanguage,
        description: `Course of ${courseLanguage} in ${languageLevel} level.`,
        avatarId: avatar.id,
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

    const newCourse = await this.prisma.course.findUnique({
      where: {
        id: course.id,
      },
      include: {
        lessons: {
          include: {
            materials: true,
          },
        },
      },
    });

    return res.send(JSON.stringify(newCourse));
  }

  async createAsTeacher(
    req: Request,
    res: Response,
    payload: CreateCourseAsTeacherDto
  ) {
    const {
      courseLanguage,
      languageLevel,
      nativeLanguage,
      avatarUrl,
      userId,
      lessons,
      description,
    } = payload;

    const avatar = await this.prisma.image.create({
      data: {
        url: avatarUrl,
      },
    });

    const course = await this.prisma.course.create({
      data: {
        name: `${courseLanguage} (${languageLevel})`,
        nativeLanguage,
        description,
        avatarId: avatar.id,
        userId,
      },
    });

    lessons.forEach(
      async ({ name, keyWords, description, materialName, materialText }) => {
        const lesson = await this.prisma.lesson.create({
          data: {
            name,
            keyWords,
            description,
            courseId: course.id,
          },
        });

        await this.prisma.material.create({
          data: {
            name: materialName,
            description: materialText,
            lessonId: lesson.id,
          },
        });
      }
    );

    const newCourse = await this.prisma.course.findUnique({
      where: {
        id: course.id,
      },
      include: {
        lessons: {
          include: {
            materials: true,
          },
        },
      },
    });

    return res.send(JSON.stringify(newCourse));
  }

  async findAll(req: Request, res: Response, userId: string) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!foundUser) {
      throw new BadRequestException("No user found for id: " + userId);
    }

    const courses = await this.prisma.course.findMany({
      where: {
        userId,
      },
      include: {
        avatar: true,
      },
    });
    return res.send(JSON.stringify(courses));
  }

  async findOne(req: Request, res: Response, id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
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

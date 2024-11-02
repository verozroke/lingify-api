import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { Request, Response } from "express";

@Controller("lessons")
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  create(
    req: Request,
    res: Response,
    @Body() createLessonDto: CreateLessonDto
  ) {
    return this.lessonsService.create(req, res, createLessonDto);
  }

  @Get()
  findAll(req: Request, res: Response) {
    return this.lessonsService.findAll(req, res);
  }

  @Get(":id")
  findOne(req: Request, res: Response, @Param("id") id: string) {
    return this.lessonsService.findOne(req, res, id);
  }

  @Patch(":id")
  update(
    req: Request,
    res: Response,
    @Param("id") id: string,
    @Body() updateLessonDto: UpdateLessonDto
  ) {
    return this.lessonsService.update(req, res, id, updateLessonDto);
  }

  @Delete(":id")
  remove(req: Request, res: Response, @Param("id") id: string) {
    return this.lessonsService.remove(req, res, id);
  }
}

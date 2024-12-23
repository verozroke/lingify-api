import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Query,
} from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Request, Response } from "express";
import { CreateCourseAsTeacherDto } from "./dto/create-course-as-teacher.dto";

@Controller("courses")
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createCourseDto: CreateCourseDto
  ) {
    return this.coursesService.create(req, res, createCourseDto);
  }

  @Post("/as-teacher")
  createAsTeacher(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createCourseAsTeacherDto: CreateCourseAsTeacherDto
  ) {
    return this.coursesService.createAsTeacher(
      req,
      res,
      createCourseAsTeacherDto
    );
  }

  @Get()
  findAll(
    @Req() req: Request,
    @Res() res: Response,
    @Query("user_id") userId: string
  ) {
    return this.coursesService.findAll(req, res, userId);
  }

  @Get(":id")
  findOne(@Req() req: Request, @Res() res: Response, @Param("id") id: string) {
    return this.coursesService.findOne(req, res, id);
  }

  @Get("/name/:courseName")
  findOneByName(
    @Req() req: Request,
    @Res() res: Response,
    @Param("courseName") courseName: string
  ) {
    return this.coursesService.findOneByName(req, res, courseName);
  }

  @Patch(":id")
  update(
    @Req() req: Request,
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateCourseDto: UpdateCourseDto
  ) {
    return this.coursesService.update(req, res, id, updateCourseDto);
  }

  @Delete(":id")
  remove(@Req() req: Request, @Res() res: Response, @Param("id") id: string) {
    return this.coursesService.remove(req, res, id);
  }
}

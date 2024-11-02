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
} from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { Request, Response } from "express";

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

  @Get()
  findAll(@Req() req: Request, @Res() res: Response) {
    return this.coursesService.findAll(req, res);
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

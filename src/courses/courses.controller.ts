import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Request, Response } from 'express';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Post()
  create(req: Request, res: Response, @Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(req, res, createCourseDto);
  }

  @Get()
  findAll(req: Request, res: Response) {
    return this.coursesService.findAll(req, res);
  }

  @Get(':id')
  findOne(req: Request, res: Response, @Param('id') id: string) {
    return this.coursesService.findOne(req, res, id);
  }

  @Patch(':id')
  update(req: Request, res: Response, @Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(req, res, id, updateCourseDto);
  }

  @Delete(':id')
  remove(req: Request, res: Response, @Param('id') id: string) {
    return this.coursesService.remove(req, res, id);
  }
}

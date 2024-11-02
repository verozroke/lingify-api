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
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Request, Response } from "express";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createCommentDto: CreateCommentDto
  ) {
    return this.commentsService.create(req, res, createCommentDto);
  }

  @Get()
  findAll(@Req() req: Request, @Res() res: Response) {
    return this.commentsService.findAll(req, res);
  }

  @Get(":id")
  findOne(@Req() req: Request, @Res() res: Response, @Param("id") id: string) {
    return this.commentsService.findOne(req, res, id);
  }

  @Patch(":id")
  update(
    @Req() req: Request,
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    return this.commentsService.update(req, res, id, updateCommentDto);
  }

  @Delete(":id")
  remove(@Req() req: Request, @Res() res: Response, @Param("id") id: string) {
    return this.commentsService.remove(req, res, id);
  }
}

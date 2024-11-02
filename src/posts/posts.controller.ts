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
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Request, Response } from "express";
import { LikePostDto } from "./dto/like-post.dto";
import { CommentPostDto } from "./dto/comment-post.dto";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createPostDto: CreatePostDto
  ) {
    return this.postsService.create(req, res, createPostDto);
  }

  @Get()
  findAll(@Req() req: Request, @Res() res: Response) {
    return this.postsService.findAll(req, res);
  }

  @Get(":id")
  findOne(@Req() req: Request, @Res() res: Response, @Param("id") id: string) {
    return this.postsService.findOne(req, res, id);
  }

  @Patch(":id")
  update(
    @Req() req: Request,
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updatePostDto: UpdatePostDto
  ) {
    return this.postsService.update(req, res, id, updatePostDto);
  }

  @Delete(":id")
  remove(@Req() req: Request, @Res() res: Response, @Param("id") id: string) {
    return this.postsService.remove(req, res, id);
  }

  @Post("/like")
  like(
    @Req() req: Request,
    @Res() res: Response,
    @Body() likePostDto: LikePostDto
  ) {
    return this.postsService.like(req, res, likePostDto);
  }

  @Post("/comment")
  comment(
    @Req() req: Request,
    @Res() res: Response,
    @Body() commentPostDto: CommentPostDto
  ) {
    return this.postsService.comment(req, res, commentPostDto);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request, Response } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  create(req: Request, res: Response, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(req, res, createPostDto);
  }

  @Get()
  findAll(req: Request, res: Response) {
    return this.postsService.findAll(req, res);
  }

  @Get(':id')
  findOne(req: Request, res: Response, @Param('id') id: string) {
    return this.postsService.findOne(req, res, id);
  }

  @Patch(':id')
  update(req: Request, res: Response, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(req, res, id, updatePostDto);
  }

  @Delete(':id')
  remove(req: Request, res: Response, @Param('id') id: string) {
    return this.postsService.remove(req, res, id);
  }
}

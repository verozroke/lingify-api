import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Request, Response } from 'express';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) { }

  @Post()
  create(req: Request, res: Response, @Body() createCommunityDto: CreateCommunityDto) {
    return this.communitiesService.create(req, res, createCommunityDto);
  }

  @Get()
  findAll(req: Request, res: Response) {
    return this.communitiesService.findAll(req, res);
  }

  @Get(':id')
  findOne(req: Request, res: Response, @Param('id') id: string) {
    return this.communitiesService.findOne(req, res, id);
  }

  @Patch(':id')
  update(req: Request, res: Response, @Param('id') id: string, @Body() updateCommunityDto: UpdateCommunityDto) {
    return this.communitiesService.update(req, res, id, updateCommunityDto);
  }

  @Delete(':id')
  remove(req: Request, res: Response, @Param('id') id: string) {
    return this.communitiesService.remove(req, res, id);
  }
}

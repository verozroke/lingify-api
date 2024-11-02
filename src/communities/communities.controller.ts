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
import { CommunitiesService } from "./communities.service";
import { CreateCommunityDto } from "./dto/create-community.dto";
import { UpdateCommunityDto } from "./dto/update-community.dto";
import { Request, Response } from "express";
import { SubCommunityDto } from "./dto/sub-community.dto";

@Controller("communities")
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Post()
  create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createCommunityDto: CreateCommunityDto
  ) {
    return this.communitiesService.create(req, res, createCommunityDto);
  }

  @Get()
  findAll(@Req() req: Request, @Res() res: Response) {
    return this.communitiesService.findAll(req, res);
  }

  @Get(":id")
  findOne(@Req() req: Request, @Res() res: Response, @Param("id") id: string) {
    return this.communitiesService.findOne(req, res, id);
  }

  @Patch(":id")
  update(
    @Req() req: Request,
    @Res() res: Response,
    @Param("id") id: string,
    @Body() updateCommunityDto: UpdateCommunityDto
  ) {
    return this.communitiesService.update(req, res, id, updateCommunityDto);
  }

  @Delete(":id")
  remove(@Req() req: Request, @Res() res: Response, @Param("id") id: string) {
    return this.communitiesService.remove(req, res, id);
  }

  @Post("/sub")
  subscribe(
    @Req() req: Request,
    @Res() res: Response,
    @Body() subCommunityDto: SubCommunityDto
  ) {
    return this.communitiesService.subscribe(req, res, subCommunityDto);
  }

  @Post("/unsub")
  unsubscribe(
    @Req() req: Request,
    @Res() res: Response,
    @Body() subCommunityDto: SubCommunityDto
  ) {
    return this.communitiesService.unsubscribe(req, res, subCommunityDto);
  }

  @Get("/search/:q")
  search(
    @Param() params: { q: string },
    @Req() req: Request,
    @Res() res: Response
  ) {
    return this.communitiesService.search(params.q, req, res);
  }
}

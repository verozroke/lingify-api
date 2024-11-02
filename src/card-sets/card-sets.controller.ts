import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CardSetsService } from "./card-sets.service";
import { CreateCardSetDto } from "./dto/create-card-set.dto";
import { UpdateCardSetDto } from "./dto/update-card-set.dto";
import { Request, Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt.guard";

@Controller("card-sets")
export class CardSetsController {
  constructor(private readonly cardSetsService: CardSetsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    req: Request,
    res: Response,
    @Body() createCardSetDto: CreateCardSetDto
  ) {
    return this.cardSetsService.create(req, res, createCardSetDto);
  }

  @Get()
  findAll(req: Request, res: Response) {
    return this.cardSetsService.findAll(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(req: Request, res: Response, @Param("id") id: string) {
    return this.cardSetsService.findOne(req, res, id);
  }

  @Get("all/:ownerId")
  findAllByOwnerId(
    req: Request,
    res: Response,
    @Param("ownerId") ownerId: string
  ) {
    return this.cardSetsService.findAllByOwnerId(req, res, ownerId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(
    req: Request,
    res: Response,
    @Param("id") id: string,
    @Body() updateCardSetDto: UpdateCardSetDto
  ) {
    return this.cardSetsService.update(req, res, id, updateCardSetDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(req: Request, res: Response, @Param("id") id: string) {
    return this.cardSetsService.remove(req, res, id);
  }
}

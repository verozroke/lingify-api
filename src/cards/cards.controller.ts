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
import { CardsService } from "./cards.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { UploadAvatarDto } from "./dto/upload-avatar.dto";
import { Request, Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt.guard"; // Assuming you have a similar guard

@Controller("cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(JwtAuthGuard) // Apply guards as needed
  @Post()
  create(req: Request, res: Response, @Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(req, res, createCardDto);
  }

  @Get()
  findAll(req: Request, res: Response) {
    return this.cardsService.findAll(req, res);
  }

  @UseGuards(JwtAuthGuard) // Apply guards as needed
  @Get(":id")
  findOne(req: Request, res: Response, @Param("id") id: string) {
    return this.cardsService.findOne(req, res, id);
  }

  @UseGuards(JwtAuthGuard) // Apply guards as needed
  @Patch(":id")
  update(
    req: Request,
    res: Response,
    @Param("id") id: string,
    @Body() updateCardDto: UpdateCardDto
  ) {
    return this.cardsService.update(req, res, id, updateCardDto);
  }

  @UseGuards(JwtAuthGuard) // Apply guards as needed
  @Delete(":id")
  remove(req: Request, res: Response, @Param("id") id: string) {
    return this.cardsService.remove(req, res, id);
  }

  @UseGuards(JwtAuthGuard) // Apply guards as needed
  @Post(":id/upload/avatar")
  uploadAvatar(
    req: Request,
    res: Response,
    @Param("id") id: string,
    @Body() body: UploadAvatarDto
  ) {
    return this.cardsService.uploadAvatar(req, res, id, body);
  }
}

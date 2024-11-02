import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SubscribersService } from "./subscribers.service";
import { CreateSubscriberDto } from "./dto/create-subscriber.dto";
import { UpdateSubscriberDto } from "./dto/update-subscriber.dto";
import { Request, Response } from "express";

@Controller("subscribers")
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post()
  create(
    req: Request,
    res: Response,
    @Body() createSubscriberDto: CreateSubscriberDto
  ) {
    return this.subscribersService.create(req, res, createSubscriberDto);
  }

  @Get()
  findAll(req: Request, res: Response) {
    return this.subscribersService.findAll(req, res);
  }

  @Get(":id")
  findOne(req: Request, res: Response, @Param("id") id: string) {
    return this.subscribersService.findOne(req, res, id);
  }

  @Patch(":id")
  update(
    req: Request,
    res: Response,
    @Param("id") id: string,
    @Body() updateSubscriberDto: UpdateSubscriberDto
  ) {
    return this.subscribersService.update(req, res, id, updateSubscriberDto);
  }

  @Delete(":id")
  remove(req: Request, res: Response, @Param("id") id: string) {
    return this.subscribersService.remove(req, res, id);
  }
}

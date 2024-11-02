import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MaterialsService } from "./materials.service";
import { CreateMaterialDto } from "./dto/create-material.dto";
import { UpdateMaterialDto } from "./dto/update-material.dto";
import { Request, Response } from "express";

@Controller("materials")
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  create(
    req: Request,
    res: Response,
    @Body() createMaterialDto: CreateMaterialDto
  ) {
    return this.materialsService.create(req, res, createMaterialDto);
  }

  @Get()
  findAll(req: Request, res: Response) {
    return this.materialsService.findAll(req, res);
  }

  @Get(":id")
  findOne(req: Request, res: Response, @Param("id") id: string) {
    return this.materialsService.findOne(req, res, id);
  }

  @Patch(":id")
  update(
    req: Request,
    res: Response,
    @Param("id") id: string,
    @Body() updateMaterialDto: UpdateMaterialDto
  ) {
    return this.materialsService.update(req, res, id, updateMaterialDto);
  }

  @Delete(":id")
  remove(req: Request, res: Response, @Param("id") id: string) {
    return this.materialsService.remove(req, res, id);
  }
}

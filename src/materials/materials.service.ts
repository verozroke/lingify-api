import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service'; // Adjust the import path as necessary

@Injectable()
export class MaterialsService {
  constructor(private prisma: PrismaService) { }

  async create(req: Request, res: Response, createMaterialDto: CreateMaterialDto) {
    const material = await this.prisma.material.create({
      data: createMaterialDto
    });

    return res.send(JSON.stringify(material));
  }

  async findAll(req: Request, res: Response) {
    const materials = await this.prisma.material.findMany();
    return res.send(JSON.stringify(materials));
  }

  async findOne(req: Request, res: Response, id: string) {
    const material = await this.prisma.material.findUnique({
      where: { id }
    });

    if (!material) {
      throw new BadRequestException('Material not found');
    }

    return res.send(JSON.stringify(material));
  }

  async update(req: Request, res: Response, id: string, updateMaterialDto: UpdateMaterialDto) {
    const material = await this.prisma.material.update({
      where: { id },
      data: updateMaterialDto
    });

    return res.send(JSON.stringify(material));
  }

  async remove(req: Request, res: Response, id: string) {
    await this.prisma.material.delete({
      where: { id }
    });

    return res.send({ message: 'Material successfully deleted' });
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service'; // Adjust the import path as necessary

@Injectable()
export class CommunitiesService {
  constructor(private prisma: PrismaService) { }

  async create(req: Request, res: Response, createCommunityDto: CreateCommunityDto) {
    const community = await this.prisma.community.create({
      data: createCommunityDto
    });

    return res.send(JSON.stringify(community));
  }

  async findAll(req: Request, res: Response) {
    const communities = await this.prisma.community.findMany();
    return res.send(JSON.stringify(communities));
  }

  async findOne(req: Request, res: Response, id: string) {
    const community = await this.prisma.community.findUnique({
      where: { id }
    });

    if (!community) {
      throw new BadRequestException('Community not found');
    }

    return res.send(JSON.stringify(community));
  }

  async update(req: Request, res: Response, id: string, updateCommunityDto: UpdateCommunityDto) {
    const community = await this.prisma.community.update({
      where: { id },
      data: updateCommunityDto
    });

    return res.send(JSON.stringify(community));
  }

  async remove(req: Request, res: Response, id: string) {
    await this.prisma.community.delete({
      where: { id }
    });

    return res.send({ message: 'Community successfully deleted' });
  }
}

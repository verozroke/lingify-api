import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCountryDto } from "./dto/create-country.dto";
import { UpdateCountryDto } from "./dto/update-country.dto";
import { Request, Response } from "express";
import { PrismaService } from "prisma/prisma.service"; // Adjust the import path as necessary

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  async create(
    req: Request,
    res: Response,
    createCountryDto: CreateCountryDto
  ) {
    const country = await this.prisma.country.create({
      data: createCountryDto,
    });

    return res.send(JSON.stringify(country));
  }

  async findAll(req: Request, res: Response) {
    const countries = await this.prisma.country.findMany();
    return res.send(JSON.stringify(countries));
  }

  async findOne(req: Request, res: Response, id: string) {
    const country = await this.prisma.country.findUnique({
      where: { id },
    });

    if (!country) {
      throw new BadRequestException("Country not found");
    }

    return res.send(JSON.stringify(country));
  }

  async update(
    req: Request,
    res: Response,
    id: string,
    updateCountryDto: UpdateCountryDto
  ) {
    const country = await this.prisma.country.update({
      where: { id },
      data: updateCountryDto,
    });

    return res.send(JSON.stringify(country));
  }

  async remove(req: Request, res: Response, id: string) {
    await this.prisma.country.delete({
      where: { id },
    });

    return res.send({ message: "Country successfully deleted" });
  }
}

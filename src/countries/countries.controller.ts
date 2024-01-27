import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Request, Response } from 'express';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) { }

  @Post()
  create(req: Request, res: Response, @Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(req, res, createCountryDto);
  }

  @Get()
  findAll(req: Request, res: Response) {
    return this.countriesService.findAll(req, res);
  }

  @Get(':id')
  findOne(req: Request, res: Response, @Param('id') id: string) {
    return this.countriesService.findOne(req, res, id);
  }

  @Patch(':id')
  update(req: Request, res: Response, @Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countriesService.update(req, res, id, updateCountryDto);
  }

  @Delete(':id')
  remove(req: Request, res: Response, @Param('id') id: string) {
    return this.countriesService.remove(req, res, id);
  }
}

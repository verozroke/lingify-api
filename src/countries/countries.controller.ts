import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Request, Response } from 'express';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) { }

  @Post()
  create(@Req() req: Request, @Res() res: Response, @Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(req, res, createCountryDto);
  }

  @Get()
  findAll(@Req() req: Request, @Res() res: Response) {
    return this.countriesService.findAll(req, res);
  }

  @Get(':id')
  findOne(@Req() req: Request, @Res() res: Response, @Param('id') id: string) {
    return this.countriesService.findOne(req, res, id);
  }

  @Patch(':id')
  update(@Req() req: Request, @Res() res: Response, @Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countriesService.update(req, res, id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Res() res: Response, @Param('id') id: string) {
    return this.countriesService.remove(req, res, id);
  }
}

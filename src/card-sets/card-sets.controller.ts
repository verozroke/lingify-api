import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CardSetsService } from './card-sets.service';
import { CreateCardSetDto } from './dto/create-card-set.dto';
import { UpdateCardSetDto } from './dto/update-card-set.dto';

@Controller('card-sets')
export class CardSetsController {
  constructor(private readonly cardSetsService: CardSetsService) {}

  @Post()
  create(@Body() createCardSetDto: CreateCardSetDto) {
    return this.cardSetsService.create(createCardSetDto);
  }

  @Get()
  findAll() {
    return this.cardSetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardSetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardSetDto: UpdateCardSetDto) {
    return this.cardSetsService.update(+id, updateCardSetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardSetsService.remove(+id);
  }
}

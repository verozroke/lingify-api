import { Injectable } from '@nestjs/common';
import { CreateCardSetDto } from './dto/create-card-set.dto';
import { UpdateCardSetDto } from './dto/update-card-set.dto';

@Injectable()
export class CardSetsService {
  create(createCardSetDto: CreateCardSetDto) {
    return 'This action adds a new cardSet';
  }

  findAll() {
    return `This action returns all cardSets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cardSet`;
  }

  update(id: number, updateCardSetDto: UpdateCardSetDto) {
    return `This action updates a #${id} cardSet`;
  }

  remove(id: number) {
    return `This action removes a #${id} cardSet`;
  }
}

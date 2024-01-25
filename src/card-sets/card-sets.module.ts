import { Module } from '@nestjs/common';
import { CardSetsService } from './card-sets.service';
import { CardSetsController } from './card-sets.controller';

@Module({
  controllers: [CardSetsController],
  providers: [CardSetsService],
})
export class CardSetsModule {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateCardSetDto } from './create-card-set.dto';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCardSetDto extends PartialType(CreateCardSetDto) {
  @IsNotEmpty()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsString()
  description?: string

  @IsNotEmpty()
  @IsString()
  ownerId: string

  @IsNotEmpty()
  @IsDate()
  createdAt: Date

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date
}

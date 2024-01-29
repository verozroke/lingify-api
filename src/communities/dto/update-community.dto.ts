import { PartialType } from '@nestjs/mapped-types';
import { CreateCommunityDto } from './create-community.dto';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class UpdateCommunityDto extends PartialType(CreateCommunityDto) {
  @IsNotEmpty()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  language: string

  @IsString()
  description?: string

  @IsNotEmpty()
  @IsString()
  ownerId: string

  @IsNotEmpty()
  @IsString()
  avatarId: string

  @IsNotEmpty()
  @IsString()
  bannerId: string

  @IsNotEmpty()
  @IsString()
  countryId: string

  @IsNotEmpty()
  @IsDate()
  createdAt: Date

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date
}

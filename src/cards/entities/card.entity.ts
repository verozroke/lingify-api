import { IsDate, IsNotEmpty, IsString } from "class-validator"

export class Card {
  @IsNotEmpty()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  word: string

  @IsNotEmpty()
  @IsString()
  definition: string

  @IsNotEmpty()
  @IsString()
  cardSetId: string

  @IsNotEmpty()
  @IsString()
  imageId: string

  @IsNotEmpty()
  @IsDate()
  createdAt: Date

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date
}

import { PartialType } from "@nestjs/mapped-types";
import { CreateCardDto } from "./create-card.dto";
import { IsNotEmpty, IsString, IsDate } from "class-validator";

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  word: string;

  @IsNotEmpty()
  @IsString()
  definition: string;

  @IsNotEmpty()
  @IsString()
  cardSetId: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}

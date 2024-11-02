import { IsNotEmpty, IsString } from "class-validator";

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  word: string;

  @IsNotEmpty()
  @IsString()
  definition: string;

  @IsNotEmpty()
  @IsString()
  cardSetId: string;
}

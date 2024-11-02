import { IsNotEmpty, IsString } from "class-validator";

export class CreateCardSetDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  ownerId: string;
}

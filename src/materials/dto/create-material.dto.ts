import { IsNotEmpty, IsString } from "class-validator";

export class CreateMaterialDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  lessonId: string;
}

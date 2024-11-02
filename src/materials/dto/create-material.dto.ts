import { IsNotEmpty, IsString } from "class-validator";

export class CreateMaterialDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  lessonId: string;
}

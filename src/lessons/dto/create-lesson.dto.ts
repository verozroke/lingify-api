import { IsNotEmpty, IsString } from "class-validator";

export class CreateLessonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  keyWords: string;

  @IsString()
  videoUrl: string;

  @IsNotEmpty()
  @IsString()
  courseId: string;
}

import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export type LessonInput = {
  name: string
  description: string
  keyWords: string
  materialName: string
  materialText: string
}


export class CreateCourseAsTeacherDto {
  @IsNotEmpty()
  @IsString()
  courseLanguage: string;

  @IsNotEmpty()
  @IsString()
  nativeLanguage: string;

  @IsNotEmpty()
  @IsString()
  languageLevel: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsNotEmpty()
  avatarUrl: string;


  @IsNotEmpty()
  lessons: LessonInput[]
}

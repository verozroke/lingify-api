import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateCourseDto {
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

  @IsUrl()
  @IsNotEmpty()
  avatarUrl: string;
}

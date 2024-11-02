import { IsNotEmpty, IsString } from "class-validator";


export class CreateLessonsGetChatCompletionAnswerInputDTO {
  @IsString()
  @IsNotEmpty()
  courseLanguage: string
  @IsString()
  @IsNotEmpty()
  nativeLanguage: string
  @IsString()
  @IsNotEmpty()
  languageLevel: string
}

export class CreateMaterialsGetChatCompletionAnswerInputDTO {
  @IsString()
  @IsNotEmpty()
  courseName: string
  @IsString()
  @IsNotEmpty()
  nativeLanguage: string
  @IsString()
  @IsNotEmpty()
  lessonsName: string
  @IsString()
  @IsNotEmpty()
  lessonDescription: string
  @IsString()
  @IsNotEmpty()
  keyWords: string
}


export class CreateTestGetChatCompletionAnswerInputDTO {
  @IsString()
  @IsNotEmpty()
  lessonName: string
  @IsString()
  @IsNotEmpty()
  lessonDescription: string
  @IsString()
  @IsNotEmpty()
  keyWords: string

  @IsString()
  @IsNotEmpty()
  courseName: string

  @IsString()
  @IsNotEmpty()
  nativeLanguage: string

  @IsString()
  @IsNotEmpty()
  userInfo: string
}





export class GetChatCompletionAnswerOutputDTO {
  @IsString()
  @IsNotEmpty()
  aiMessage: string

  static getInstance(aiMessage: string) {
    const result = new GetChatCompletionAnswerOutputDTO();
    result.aiMessage = aiMessage;
    return result
  }
}
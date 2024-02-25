import { IsNotEmpty, IsString } from "class-validator";

export class GetChatCompletionAnswerInputDTO {
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
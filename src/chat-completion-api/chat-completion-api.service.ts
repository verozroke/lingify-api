import { Injectable } from "@nestjs/common";
import {
  CreateLessonsGetChatCompletionAnswerInputDTO,
  CreateMaterialsGetChatCompletionAnswerInputDTO,
  CreateTestGetChatCompletionAnswerInputDTO,
  GetChatCompletionAnswerOutputDTO,
} from "./dto/chat-completion-answer.dto";
import {
  GeneratedLesson,
  GeneratedMaterial,
  GeneratedTest,
  generatePrompt,
} from "src/utils/utils";
import { geminiUrl } from "src/utils/constants";
import axios from "axios";

@Injectable()
export class ChatCompletionApiService {
  async getAiModelAnswer<T>(prompt: string): Promise<T[]> {
    const geminiPayload = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    const { data } = await axios.post(geminiUrl, geminiPayload);
    const aiMessage = data.candidates[0].content.parts[0].text as string;
    return JSON.parse(
      GetChatCompletionAnswerOutputDTO.getInstance(aiMessage).aiMessage
    );
  }

  createLessons = async (data: CreateLessonsGetChatCompletionAnswerInputDTO) =>
    this.getAiModelAnswer<GeneratedLesson>(generatePrompt("Lessons", data));

  createMaterials = async (
    data: CreateMaterialsGetChatCompletionAnswerInputDTO
  ) =>
    this.getAiModelAnswer<GeneratedMaterial>(generatePrompt("Materials", data));
  createTest = async (data: CreateTestGetChatCompletionAnswerInputDTO) =>
    this.getAiModelAnswer<GeneratedTest>(generatePrompt("Test", data));
}

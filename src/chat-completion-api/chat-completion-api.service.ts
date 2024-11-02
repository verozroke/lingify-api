import { Injectable } from "@nestjs/common";
import {
  CreateLessonsGetChatCompletionAnswerInputDTO,
  CreateMaterialsGetChatCompletionAnswerInputDTO,
  CreateTestGetChatCompletionAnswerInputDTO,
  GetChatCompletionAnswerOutputDTO,
} from "./dto/chat-completion-answer.dto";
import { generatePrompt } from "src/utils/utils";
import { geminiUrl } from "src/utils/constants";
import axios from "axios";

@Injectable()
export class ChatCompletionApiService {
  async getAiModelAnswer(prompt: string) {
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
    return JSON.stringify(
      GetChatCompletionAnswerOutputDTO.getInstance(aiMessage).aiMessage
    );
  }

  createLessons = async (data: CreateLessonsGetChatCompletionAnswerInputDTO) =>
    this.getAiModelAnswer(generatePrompt("Lessons", data));
  createMaterials = async (
    data: CreateMaterialsGetChatCompletionAnswerInputDTO
  ) => this.getAiModelAnswer(generatePrompt("Materials", data));
  createTest = async (data: CreateTestGetChatCompletionAnswerInputDTO) =>
    this.getAiModelAnswer(generatePrompt("Test", data));
}

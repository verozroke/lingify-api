import { Injectable } from '@nestjs/common';
import { ChatHistoryManager } from './model/chat-history-manager';
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { GetChatCompletionAnswerInputDTO, GetChatCompletionAnswerOutputDTO } from './model/chat-completion-answer.dto';
import { generatePrompt } from 'src/utils/utils';

const DEFAULT_TEMPERATURE = 1
const DEFAULT_MODEL = 'gpt-3.5-turbo'

@Injectable()
export class ChatCompletionApiService {
  private readonly chatHistory: ChatHistoryManager
  private readonly chat: ChatOpenAI

  constructor() {
    this.chatHistory = new ChatHistoryManager()
    this.chat = new ChatOpenAI({
      temperature: DEFAULT_TEMPERATURE,
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: DEFAULT_MODEL
    })
  }


  async getAiModelAnswer(data: GetChatCompletionAnswerInputDTO) {
    const propmt = generatePrompt(data)
    this.chatHistory.addHumanMessage(propmt)
    const result = await this.chat.predictMessages(this.chatHistory.chatHistory)
    const aiMessage = result.content as string
    this.chatHistory.addAiMessage(aiMessage)
    return JSON.stringify(GetChatCompletionAnswerOutputDTO.getInstance(aiMessage).aiMessage)
  }
}

import { Module } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CoursesController } from "./courses.controller";
import { ChatCompletionApiService } from "src/chat-completion-api/chat-completion-api.service";

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, ChatCompletionApiService],
})
export class CoursesModule {}

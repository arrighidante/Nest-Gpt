import { Body, Controller, Post } from '@nestjs/common';
import { DanteAssistantService } from './dante-assistant.service';
import { QuestionDto } from './dtos/question.dto';

@Controller('dante-assistant')
export class DanteAssistantController {
  constructor(private readonly danteAssistantService: DanteAssistantService) {}

  @Post('create-thread')
  async createThread() {
    return await this.danteAssistantService.createThread();
  }

  @Post('user-question')
  async userQuestion(@Body() questionDto: QuestionDto) {
    return await this.danteAssistantService.userQuestion(questionDto);
  }
}

import { Module } from '@nestjs/common';
import { DanteAssistantController } from './dante-assistant.controller';
import { DanteAssistantService } from './dante-assistant.service';

@Module({
  controllers: [DanteAssistantController],
  providers: [DanteAssistantService],
})
export class DanteAssistantModule {}

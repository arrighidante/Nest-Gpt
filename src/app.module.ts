import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DanteAssistantModule } from './dante-assistant/dante-assistant.module';
import { GptModule } from './gpt/gpt.module';

@Module({
  imports: [ConfigModule.forRoot(), GptModule, DanteAssistantModule],
})
export class AppModule {}

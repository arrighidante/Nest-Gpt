import { Injectable } from '@nestjs/common';
import { OrthographyDto } from './dtos';
import { orthographyCheckUseCase } from './use-cases';

@Injectable()
export class GptService {
  // Will be used ONLY to call use-cases

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase({
      prompt: orthographyDto.prompt,
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import OpenAI from 'openai';
import {
  OrthographyDto,
  ProsConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';
import {
  orthographyCheckUseCase,
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserUseCase,
  textToAudioUseCase,
  translateUseCase,
} from './use-cases';

import * as fs from 'fs';
import * as path from 'path';

// Will be used ONLY to call use-cases
@Injectable()
export class GptService {
  /**
   * Instance of the OpenAI class used for making API calls to OpenAI.
   */
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  /**
   * Performs an orthography check using the OpenAI API.
   * @param orthographyDto - The orthography data transfer object.
   * @returns A promise that resolves to the result of the orthography check.
   */
  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  /**
   * Discusses the pros and cons of a given prompt using the OpenAI API.
   * @param prosConsDiscusserDto - The DTO containing the prompt.
   * @returns A Promise that resolves to the discussion result.
   */
  async prosConsDiscusser(prosConsDiscusserDto: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, {
      prompt: prosConsDiscusserDto.prompt,
    });
  }

  /**
   * Executes the prosConsDiscusserStreamUseCase with the provided ProsConsDiscusserDto.
   * @param prosConsDiscusserDto The ProsConsDiscusserDto containing the prompt.
   * @returns A Promise that resolves to the result of the prosConsDiscusserStreamUseCase.
   */
  async prosConsDiscusserStream(prosConsDiscusserDto: ProsConsDiscusserDto) {
    return await prosConsDiscusserStreamUseCase(this.openai, {
      prompt: prosConsDiscusserDto.prompt,
    });
  }

  /**
   * Translates the given text using the specified language.
   * @param {TranslateDto} options - The options for translation.
   * @param {string} options.prompt - The text to be translated.
   * @param {string} options.lang - The language to translate the text into.
   * @returns {Promise<string>} - The translated text.
   */
  async translateText({ prompt, lang }: TranslateDto) {
    return await translateUseCase(this.openai, {
      prompt,
      lang,
    });
  }

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, {
      prompt,
      voice,
    });
  }

  async textToAudioGetter(fileId: string) {
    const filePath = path.resolve(
      __dirname,
      `../../generated/audios/${fileId}.mp3`,
    );

    const wasFound = fs.existsSync(filePath);
    if (!wasFound) throw new NotFoundException(`File ${fileId} not found`);

    return filePath;
  }
}

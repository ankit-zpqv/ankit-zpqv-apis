import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { CompletionResponseDto } from './dto/completion.dto';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor() {
    // Initialize the OpenAI client with API key from environment variables
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Generate a completion using OpenAI's API
   * @param prompt The prompt to generate a completion for
   * @param model The model to use for completion (defaults to gpt-3.5-turbo)
   * @param systemPrompt Optional system prompt to set context for the AI
   * @returns The generated completion as a CompletionResponseDto
   */
  async generateCompletion(
    prompt: string,
    model = 'gpt-3.5-turbo',
    systemPrompt?: string,
  ): Promise<CompletionResponseDto> {
    try {
      const messages: ChatCompletionMessageParam[] = [];

      // Add system message if provided
      if (systemPrompt) {
        messages.push({ role: 'system', content: systemPrompt });
      }

      // Add user message
      messages.push({ role: 'user', content: prompt });

      const completion = await this.openai.chat.completions.create({
        model,
        messages,
      });

      const message = completion.choices[0].message;

      // Convert to DTO
      return {
        role: message.role,
        content: message.content || '', // Handle potential null content
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to generate completion: ${errorMessage}`);
    }
  }
}

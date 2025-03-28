import { ApiProperty } from '@nestjs/swagger';

export class CompletionDto {
  @ApiProperty({
    description: 'The prompt to generate a completion for',
    example: 'Tell me a joke about programming',
    required: true,
  })
  prompt: string;

  @ApiProperty({
    description: 'The OpenAI model to use for completion',
    example: 'gpt-3.5-turbo',
    required: false,
    default: 'gpt-3.5-turbo',
  })
  model?: string;

  @ApiProperty({
    description: 'The system prompt to set context for the AI',
    example: 'You are a helpful assistant that speaks like a pirate.',
    required: false,
  })
  systemPrompt?: string;

  @ApiProperty({
    description: 'The maximum number of tokens to generate',
    example: 100,
    required: false,
  })
  maxTokens?: number;
}

export class CompletionResponseDto {
  @ApiProperty({
    description: 'The role of the message (system, user, or assistant)',
    example: 'assistant',
  })
  role: string;

  @ApiProperty({
    description: 'The content of the completion',
    example:
      'Why do programmers prefer dark mode? Because light attracts bugs!',
  })
  content: string;
}

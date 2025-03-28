import { ApiProperty } from '@nestjs/swagger';

/**
 * Schema for OpenAI API responses
 */
export class OpenAiResponseSchema {
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

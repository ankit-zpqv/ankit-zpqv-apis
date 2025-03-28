import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OpenAiService } from './openai.service';
import { CompletionDto, CompletionResponseDto } from './dto/completion.dto';
import { OpenAiResponseSchema } from './schemas/openai.schema';

/**
 * Controller for OpenAI API endpoints
 */
@ApiTags('openai')
@Controller('openai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  /**
   * Generate a completion using OpenAI's API
   * @param completionDto The completion request data
   * @returns The generated completion
   */
  @ApiOperation({
    summary: 'Generate a completion using OpenAI',
    description:
      'Sends a prompt to OpenAI and returns the generated completion. Optionally accepts a system prompt to set context.',
  })
  @ApiBody({
    type: CompletionDto,
    description:
      'The prompt, optional model, and optional system prompt to use for completion',
  })
  @ApiResponse({
    status: 200,
    description: 'The completion has been successfully generated',
    type: OpenAiResponseSchema,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid prompt or model',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error - OpenAI API error or server issue',
  })
  @Post('completion')
  async generateCompletion(
    @Body() completionDto: CompletionDto,
  ): Promise<CompletionResponseDto> {
    return this.openAiService.generateCompletion(
      completionDto.prompt,
      completionDto.model,
      completionDto.systemPrompt,
    );
  }
}

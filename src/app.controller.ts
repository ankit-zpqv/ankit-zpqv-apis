import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

/**
 * Main application controller
 */
@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Returns a hello message
   * @returns A greeting string
   */
  @ApiOperation({
    summary: 'Get a hello message',
    description:
      'Returns a simple greeting message to verify the API is working',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns a hello message',
    schema: {
      type: 'string',
      example: 'Hello World!',
    },
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

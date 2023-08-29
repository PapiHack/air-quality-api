import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    description: `Hello, World.`,
    summary: `Hello, World.`,
  })
  @ApiOkResponse({
    schema: { type: 'string' },
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health-check')
  @ApiOperation({
    description: `Get service health.`,
    summary: `Get service health.`,
  })
  @ApiOkResponse({
    schema: { type: 'object', properties: { message: { type: 'string' } } },
  })
  healthCheck() {
    return {
      message: 'Service is healthy !',
    };
  }
}

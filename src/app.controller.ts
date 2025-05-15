import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { JSFeatureFlagModel } from '@josys-src/josys-feature-flags';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/testff')
  async testFF(@Body() payload: JSFeatureFlagModel): Promise<boolean> {
    return await this.appService.checkIfEnabled(payload);
  }

  @Post('/testSetContext')
  async testSetContext(
    @Body() payload: Record<string, any>,
  ): Promise<Record<string, any>> {
    const {contextId, data: incomingContext, contextTtl} = payload;
    return await this.appService.testSetContext(contextId, incomingContext, contextTtl);
  }
}

import { Injectable } from '@nestjs/common';
import {
  JSFeatureFlagsService,
  JSFeatureFlagModel,
} from '@josys-src/josys-feature-flags';

@Injectable()
export class AppService {
  constructor(private readonly ffSidecarService: JSFeatureFlagsService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async checkIfEnabled(featurePayload: JSFeatureFlagModel): Promise<boolean> {
    return await this.ffSidecarService.isFeatureEnabled(featurePayload);
  }

  async testSetContext(contextId: string, incomingContext: Record<string, any>, contextTtl: number): Promise<Record<string, any>> {
    return await this.ffSidecarService.setGlobalContextThroughProvider(contextId, incomingContext, contextTtl)
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JSFeatureFlagsModule, Providers } from '@josys-src/josys-feature-flags';
import {
  LoggerModule,
  LoggerService,
} from '@josys-src/josys-commons/packages/logger';

const LOGGER_INJECTION_PROVIDER = {
  provide: Providers.LoggerProvider,
  useFactory: (logger: LoggerService) => {
    return logger;
  },
  inject: [LoggerService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    LoggerModule.forRoot({
      appName: process.env.APP_NAME,
      sentryDNS: process.env.ERROR_SENTRY_DSN,
      debugMode: true,
      isSentryEnable: false,
      environment: process.env.ERROR_SENTRY_ENV,
      logLevel: [process.env.ERROR_SENTRY_LOG_LEVEL],
      tracesSampleRate: 10,
      consoleOptions: {
        level: process.env?.SURVEY_SERVICE_LOG_LEVEL?.toLowerCase() || 'info',
      },
    }),

    JSFeatureFlagsModule.forRootAsync({
      providers: [LOGGER_INJECTION_PROVIDER]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

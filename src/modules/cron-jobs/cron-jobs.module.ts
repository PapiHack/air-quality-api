import { Module } from '@nestjs/common';
import { CronJobsService } from './cron-jobs.service';
import { AirQualityModule } from '../air-quality/air-quality.module';
import { AirQualityService } from '../air-quality/air-quality.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AirQualityModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get<number>('http.timeout'),
        maxRedirects: configService.get<number>('http.maxRedirects'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CronJobsService, AirQualityService],
})
export class CronJobsModule {}

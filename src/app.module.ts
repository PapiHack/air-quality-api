import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { ValidateConfigurationEnvironment } from './config/env.validation';
import { MongooseModule } from '@nestjs/mongoose';
import { AirQualityModule } from './modules/air-quality/air-quality.module';
import { CronJobsModule } from './modules/cron-jobs/cron-jobs.module';

@Module({
  imports: [
    AirQualityModule,
    ConfigModule.forRoot({
      load: [configuration],
      validate: ValidateConfigurationEnvironment,
      isGlobal: true,
    }),
    CronJobsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('db.uri'),
      }),
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}

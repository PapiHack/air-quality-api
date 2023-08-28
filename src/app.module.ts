import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { ValidateConfigurationEnvironment } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate: ValidateConfigurationEnvironment,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}

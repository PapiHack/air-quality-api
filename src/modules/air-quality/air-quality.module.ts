import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AirQualityService } from './air-quality.service';
import { AirQualityController } from './air-quality.controller';
import {
  AirQualityZoneResult,
  AirQualityZoneResultSchema,
} from './models/air-quality-zone-result.entity';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get<number>('http.timeout'),
        maxRedirects: configService.get<number>('http.maxRedirects'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: AirQualityZoneResult.name,
        schema: AirQualityZoneResultSchema,
      },
    ]),
  ],
  providers: [AirQualityService, ConfigService],
  controllers: [AirQualityController],
  exports: [AirQualityService, MongooseModule],
})
export class AirQualityModule {}

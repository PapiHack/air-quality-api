import { Injectable, Logger } from '@nestjs/common';
import { AirQualityService } from '../air-quality/air-quality.service';
import {
  AirQualityByZoneDTO,
  AirQualityZoneResultDTO,
} from '../air-quality/dtos/air-quality.dto';
import { Cron } from '@nestjs/schedule';

const PARIS_ZONE = {
  latitude: 48.856613,
  longitude: 2.352222,
};

@Injectable()
export class CronJobsService {
  private readonly logger = new Logger(CronJobsService.name);
  constructor(private readonly airQualityService: AirQualityService) {}

  @Cron('* * * * *')
  async getParisZoneAirQuality() {
    const parisZone = new AirQualityByZoneDTO();
    parisZone.latitude = PARIS_ZONE.latitude;
    parisZone.longitude = PARIS_ZONE.longitude;

    const parisZoneAirQualityResponse: any =
      await this.airQualityService.getAirQualityByZone(parisZone);
    const parisZoneAirQualityData: AirQualityZoneResultDTO =
      parisZoneAirQualityResponse.Result.Pollution;

    const result = await this.airQualityService.saveZoneAirQuality(
      parisZoneAirQualityData,
    );
    this.logger.debug(`Result with id #${result._id} saved.`);
  }
}

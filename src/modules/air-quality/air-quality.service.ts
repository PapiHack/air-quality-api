import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { throwError } from 'rxjs';
import {
  AirQualityByZoneDTO,
  AirQualityZoneResultDTO,
} from './dtos/air-quality.dto';
import { Utils } from '../../utils/utils';
import { AirQualityZoneResult } from './models/air-quality-zone-result.entity';
import { PaginationQueryDTO } from '../../common/dto/pagination-query.dto';

@Injectable()
export class AirQualityService {
  baseURL: string;
  private readonly logger = new Logger(AirQualityService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @InjectModel(AirQualityZoneResult.name)
    private readonly airQualityZoneResultModel: Model<AirQualityZoneResult>,
  ) {
    this.baseURL = `${this.configService.get<string>(
      'iqair.apiUrl',
    )}/${this.configService.get<string>('iqair.apiVersion')}`;
  }

  async getAirQualityByZone(zoneDTO: AirQualityByZoneDTO) {
    const endpoint = `${this.baseURL}/nearest_city`;
    const result = await new Promise((resove, reject) => {
      this.httpService
        .get(endpoint, {
          params: {
            lat: zoneDTO.latitude,
            lon: zoneDTO.longitude,
            key: this.configService.get<string>('iqair.apiKey'),
          },
        })
        .subscribe({
          next: (axiosResponse) => {
            const response = axiosResponse.data;
            resove(Utils.wrapResponse(response.data.current.pollution));
          },
          error: (error) => {
            this.logger.error(error);
            reject(error);
            return throwError(() => error);
          },
        });
    });
    return result;
  }

  async saveZoneAirQuality(airQualityZoneDTO: AirQualityZoneResultDTO) {
    const airQualityZone =
      await this.airQualityZoneResultModel.create(airQualityZoneDTO);
    return airQualityZone.toJSON();
  }

  async getAllSavedParisZoneAirQuality(paginationQueryDTO: PaginationQueryDTO) {
    const { limit, offset } = paginationQueryDTO;
    const airQualityData = await this.airQualityZoneResultModel
      .find()
      .limit(limit)
      .skip(offset)
      .exec();
    if (airQualityData.length) {
      return airQualityData.map((airQuality) => airQuality.toJSON());
    }
    return [];
  }

  async getParisZoneMostPollutedTime() {
    const result = await this.airQualityZoneResultModel
      .find()
      .sort({ aqius: -1, aqicn: -1 })
      .limit(1)
      .exec();
    const timestamp = result.at(0).ts;
    const [date, time] = timestamp.toLocaleString().split(' ');
    return { date, time };
  }
}

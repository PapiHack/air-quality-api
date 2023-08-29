import { Controller, Get, Query } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { AirQualityByZoneDTO } from './dtos/air-quality.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDTO } from '../../common/dto/pagination-query.dto';
import {
  AirQualityZoneResultSwaggerSchema,
  DateTimeSwaggerSchema,
  SavedAirQualitySwaggerSchema,
} from '../../common/schemas/custom-swagger-schema';

@Controller('air-quality')
@ApiTags('air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Get('zone')
  @ApiOperation({
    description: `Get Air Quality for a given zone's coordinates.`,
    summary: `Get Air Quality for a given zone's coordinates.`,
  })
  @ApiOkResponse({ schema: AirQualityZoneResultSwaggerSchema })
  async getZoneAirQuality(
    @Query()
    zone: AirQualityByZoneDTO,
  ) {
    return this.airQualityService.getAirQualityByZone(zone);
  }

  @Get('paris/most-polluted-time')
  @ApiOperation({
    description: `Get Date and Time where the Paris zone is the most polluted.`,
    summary: `Get Date and Time where the Paris zone is the most polluted.`,
  })
  @ApiOkResponse({ schema: DateTimeSwaggerSchema })
  async getParisZoneMostPollutedTime() {
    return this.airQualityService.getParisZoneMostPollutedTime();
  }

  @Get('paris')
  @ApiOperation({
    description: `Get saved air quality data for Paris zone.`,
    summary: `Get saved air quality data for Paris zone.`,
  })
  @ApiOkResponse({ schema: SavedAirQualitySwaggerSchema })
  async getParisZoneSavedAirQuality(
    @Query() paginationQueryDTO: PaginationQueryDTO,
  ) {
    return this.airQualityService.getAllSavedParisZoneAirQuality(
      paginationQueryDTO,
    );
  }
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AirQualityByZoneDTO {
  @ApiProperty()
  @IsLatitude()
  @Type(() => Number)
  latitude: number;

  @ApiProperty()
  @IsLongitude()
  @Type(() => Number)
  longitude: number;
}

export class AirQualityZoneResultDTO {
  @ApiProperty()
  @IsDate()
  ts: Date;

  @ApiProperty()
  @IsNumber()
  aqius: number;

  @ApiProperty()
  @IsString()
  mainus: string;

  @ApiProperty()
  @IsNumber()
  aqicn: number;

  @ApiProperty()
  @IsString()
  maincn: string;
}

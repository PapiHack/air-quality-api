import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class AirQualityZoneResult {
  @Prop()
  ts: Date;

  @Prop()
  aqius: number;

  @Prop()
  mainus: string;

  @Prop()
  aqicn: number;

  @Prop()
  maincn: string;
}

export const AirQualityZoneResultSchema =
  SchemaFactory.createForClass(AirQualityZoneResult);

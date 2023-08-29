import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityController } from './air-quality.controller';

describe('AirQualityController', () => {
  let controller: AirQualityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirQualityController],
    }).compile();

    controller = module.get<AirQualityController>(AirQualityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityController } from './air-quality.controller';
import { AirQualityService } from './air-quality.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AirQualityModule } from './air-quality.module';
import { Connection, Model, connect } from 'mongoose';
import {
  AirQualityZoneResult,
  AirQualityZoneResultSchema,
} from './models/air-quality-zone-result.entity';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('AirQualityController', () => {
  let controller: AirQualityController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let mockAirQualityModel: Model<AirQualityZoneResult>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    mockAirQualityModel = mongoConnection.model(
      AirQualityZoneResult.name,
      AirQualityZoneResultSchema,
    );
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, AirQualityModule, MongooseModule.forRoot(uri)],
      providers: [
        AirQualityService,
        ConfigService,
        {
          provide: getModelToken(AirQualityZoneResult.name),
          useValue: mockAirQualityModel,
        },
      ],
      controllers: [AirQualityController],
    }).compile();

    controller = module.get<AirQualityController>(AirQualityController);
  });

  afterAll(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

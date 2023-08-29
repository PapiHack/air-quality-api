import { Test, TestingModule } from '@nestjs/testing';
import { AirQualityService } from './air-quality.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Connection, Model, connect } from 'mongoose';
import {
  AirQualityZoneResult,
  AirQualityZoneResultSchema,
} from './models/air-quality-zone-result.entity';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('AirQualityService', () => {
  let service: AirQualityService;
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
      imports: [
        ConfigModule,
        HttpModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            timeout: configService.get('http.timeout'),
            maxRedirects: configService.get('http.maxRedirects'),
          }),
          inject: [ConfigService],
        }),
        MongooseModule.forRoot(uri),
      ],
      providers: [
        AirQualityService,
        ConfigService,
        {
          provide: getModelToken(AirQualityZoneResult.name),
          useValue: mockAirQualityModel,
        },
      ],
    }).compile();

    service = module.get<AirQualityService>(AirQualityService);
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
    expect(service).toBeDefined();
  });
});

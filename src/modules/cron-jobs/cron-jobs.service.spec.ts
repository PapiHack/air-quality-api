import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CronJobsService } from './cron-jobs.service';
import { AirQualityService } from '../air-quality/air-quality.service';
import { AirQualityModule } from '../air-quality/air-quality.module';
import { Connection, Model, connect } from 'mongoose';
import {
  AirQualityZoneResult,
  AirQualityZoneResultSchema,
} from '../air-quality/models/air-quality-zone-result.entity';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('CronJobsService', () => {
  let service: CronJobsService;
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
        AirQualityModule,
        ConfigModule,
        HttpModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            timeout: configService.get<number>('http.timeout'),
            maxRedirects: configService.get<number>('http.maxRedirects'),
          }),
          inject: [ConfigService],
        }),
        MongooseModule.forRoot(uri),
      ],
      providers: [
        CronJobsService,
        ConfigService,
        AirQualityService,
        {
          provide: getModelToken(AirQualityZoneResult.name),
          useValue: mockAirQualityModel,
        },
      ],
    }).compile();

    service = module.get<CronJobsService>(CronJobsService);
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

import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { Environment } from './env-types.enum';
import { plainToInstance } from 'class-transformer';

class EnvironmentVariables {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment = Environment.Development;

  @IsNumber()
  PORT: number;

  @IsString()
  MONGO_URI: string;

  @IsString()
  IQAIR_API_KEY: string;

  @IsString()
  IQAIR_API_URL: string;

  @IsString()
  IQAIR_API_VERSION: string;

  @IsNumber()
  HTTP_TIMEOUT: number;

  @IsNumber()
  HTTP_MAX_REDIRECTS: number;

  @IsString()
  API_PREFIX: string;
}

export const ValidateConfigurationEnvironment = (
  config: Record<string, unknown>,
) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};

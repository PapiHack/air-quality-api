import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDTO {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}

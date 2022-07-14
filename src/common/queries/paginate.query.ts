// Nestjs
import { ApiPropertyOptional } from '@nestjs/swagger';

// Third party
import { PaginateQuery } from 'nestjs-paginate';
import { IsArray, IsInt, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

// Main section
export class PaginationQuery implements PaginateQuery {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value > 0 ? value : null))
  @IsInt()
  @IsPositive()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value > 0 ? value : null))
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  sortBy?: [string, string][];

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  searchBy?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;

  // @ApiPropertyOptional()
  // eslint-disable-next-line @moneteam/nestjs/all-properties-are-whitelisted
  path: string;
}

export declare const Paginate: (...dataOrPipes: unknown[]) => ParameterDecorator;

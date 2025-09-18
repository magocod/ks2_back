import { IsInt, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
// import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  // @ApiProperty({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  // @ApiProperty({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}

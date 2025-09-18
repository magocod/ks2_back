import { Type } from 'class-transformer';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHouseDto {
  @ApiProperty({ default: '123 ....' })
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  address: string;

  @ApiProperty({ default: 10 })
  @Type(() => Number) // This is crucial for transforming string inputs to actual numbers
  @IsNumber()
  price: number;

  @ApiProperty({ default: 0 })
  @Type(() => Number) // This is crucial for transforming string inputs to actual numbers
  @IsNumber()
  status: number;
}

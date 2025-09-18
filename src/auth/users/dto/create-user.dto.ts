import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PASSWORD_PATTERN } from '../../auth.constants';

// admin registration
export class AdminCreateUserDto {
  @ApiProperty({ default: 'example1@domain.com' })
  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @ApiProperty({ default: 'Abcd1234*' })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(PASSWORD_PATTERN, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({ default: 'name' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

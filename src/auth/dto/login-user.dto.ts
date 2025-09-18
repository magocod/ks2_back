import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { PASSWORD_PATTERN } from '../auth.constants';

export class LoginUserDto {
  @ApiProperty({ default: 'example1@domain.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'Abcd1234*' })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}

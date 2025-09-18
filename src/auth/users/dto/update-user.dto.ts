import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { AdminCreateUserDto } from './create-user.dto';
import { IsEmail, IsString } from 'class-validator';

export class AdminUpdateUserDto extends PartialType(
  OmitType(AdminCreateUserDto, ['password']),
) {
  @ApiProperty({ default: 'example1@domain.com' })
  @IsString()
  @IsEmail()
  email: string;
}

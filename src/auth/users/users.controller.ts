import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminUpdateUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Auth_users')
@Controller({ path: 'users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() createUserDto: AdminCreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: AdminUpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.remove(+id);
  }
}

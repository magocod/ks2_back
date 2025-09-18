import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe, Query,
} from '@nestjs/common';
import { HousesService } from './houses.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { Auth, GetUser } from '../auth/decorators';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../auth/users/entities';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Houses')
@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @Post()
  @Auth()
  create(@Body() createHouseDto: CreateHouseDto, @GetUser() user: User) {
    return this.housesService.create(createHouseDto, user);
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.housesService.findAll(paginationDto, user);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseIntPipe) id: string, @GetUser() user: User) {
    return this.housesService.findOneAndCheckUser(+id, user);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateHouseDto: UpdateHouseDto,
    @GetUser() user: User
  ) {
    return this.housesService.update(+id, updateHouseDto, user);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseIntPipe) id: string, @GetUser() user: User) {
    return this.housesService.remove(+id, user);
  }
}

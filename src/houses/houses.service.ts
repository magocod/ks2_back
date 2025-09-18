import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { User } from '../auth/users/entities';
import { InjectModel } from '@nestjs/sequelize';
import { House } from './entities/house.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class HousesService {

  constructor(
    @InjectModel(House)
    private houseModel: typeof House,
  ) {}

  checkHouseBelongsToUser(user: User, house: House) {
    if (user.dataValues.id !== house.dataValues.sellerId) {
      throw new UnauthorizedException('House does not belong to this user');
    }
  }

  async create(createHouseDto: CreateHouseDto, user: User) {
    const house = await this.houseModel.create({
      ...createHouseDto,
      sellerId: user.dataValues.id,
    });

    // ...
    return house.dataValues
  }

  async findAll(paginationDto: PaginationDto, user: User) {

    const { page, limit } = paginationDto;
    const offset = (page! - 1) * limit!;

    const result = await this.houseModel.findAndCountAll(
      {
        where: {
        sellerId: user.dataValues.id,
      },
        include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      ],
      offset,
      limit,
    });

    return result;
  }

  async findOne(id: number) {
    const house = await this.houseModel.findOne({
      where: {
        id
      }
    });

    if (!house) throw new NotFoundException(`House with ${id} not found`);

    return house
  }

  async findOneAndCheckUser(id: number, user: User) {
    const house = await this.findOne(id);
    this.checkHouseBelongsToUser(user, house);
    return house;
  }

  async update(id: number, updateHouseDto: UpdateHouseDto, user: User) {
    const house = await this.findOneAndCheckUser(id, user);
    await house.update(updateHouseDto);
    // TODO optimize db here
    return this.findOne(id);
  }

  async remove(id: number, user: User) {
    const house = await this.findOneAndCheckUser(id, user);
    await house.destroy();
  }
}

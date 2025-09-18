import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AdminCreateUserDto, AdminUpdateUserDto } from './dto';
import { User } from './entities';
import { InjectModel } from '@nestjs/sequelize';
import { PaginationDto } from '../../common/dto/pagination.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: AdminCreateUserDto) {
    const { password, ...userData } = createUserDto;

    await this.checkEmailExists(userData.email);

    const user = await this.userModel.create({
      ...userData,
      password: bcrypt.hashSync(password, 10),
      isActive: true,
    });

    return {
      id: user.dataValues.id as number,
      email: user.dataValues.email,
    };
  }

  async checkEmailExists(email: string) {
    const result = await this.userModel.findOne({
      where: { email },
    });

    if (result == null) {
      return;
    }

    throw new BadRequestException('email already exists');
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const offset = (page! - 1) * limit!;

    const result = await this.userModel.findAndCountAll(
      {
        attributes: { exclude: ['password'] },
        offset,
        limit,
      }
    );

    return result;
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });

    if (!user) throw new NotFoundException(`User with ${id} not found`);

    return user;
  }

  async update(id: number, updateUserDto: AdminUpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.email) {
      if (updateUserDto.email !== user.dataValues.email) {
        await this.checkEmailExists(updateUserDto.email);
      }
    }

    await user.update(updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await user.destroy();
    // await this.userModel.destroy({
    //   where: { id },
    // });
  }
}

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User } from './users/entities';
import { LoginUserDto, RegisterUserDto } from './dto';
import { JwtPayload } from './auth.constants';
import {
  CREDENTIALS_INVALID_EMAIL,
  CREDENTIALS_INVALID_PASSWORD,
} from './auth.messages';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async create(createUserDto: RegisterUserDto) {
    const { password, ...userData } = createUserDto;

    await this.userService.checkEmailExists(createUserDto.email);

    try {

      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
        isActive: true,
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      delete user.password;

      return {
        email: user.dataValues.email,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userModel.findOne({
      where: { email },
    });

    if (!user) throw new UnauthorizedException(CREDENTIALS_INVALID_EMAIL);

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(CREDENTIALS_INVALID_PASSWORD);

    return {
      email: user.email,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  checkAuthStatus(user: User) {
    return {
      name: user.dataValues.name,
      email: user.dataValues.email,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload): string {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {
    console.log(error);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error.code === '23505') throw new BadRequestException(error.detail);
    throw new InternalServerErrorException('Please check server logs');
  }
}

import { Module } from '@nestjs/common';
import { HousesService } from './houses.service';
import { HousesController } from './houses.controller';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { House } from './entities/house.entity';

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forFeature([House]),
  ],
  controllers: [HousesController],
  providers: [HousesService],
})
export class HousesModule {}

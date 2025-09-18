import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { User } from '../../auth/users/entities';

@Table
export class House extends Model<
  InferAttributes<House>,
  InferCreationAttributes<House>
> {
  declare id: CreationOptional<number>;

  @Column
  declare address: string;

  @Column(DataType.DECIMAL)
  declare price: number;

  @Column(DataType.INTEGER)
  declare status: number;

  @Column(DataType.INTEGER)
  declare sellerId: number;

  @BelongsTo(() => User, 'sellerId')
  declare user?: User;

  @CreatedAt
  declare createdAt?: Date;

  @UpdatedAt
  declare updatedAt?: Date;
}

import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  DataType,
} from "sequelize-typescript";

export interface IPlan {
  id: number;
  planType: string;
  price: number;
  duration: number;
}

@Table
class Plan extends Model implements IPlan {
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column
  planType: string;

  @AllowNull(false)
  @Column
  price: number;

  @AllowNull(false)
  @Column
  duration: number;
}

export default Plan;

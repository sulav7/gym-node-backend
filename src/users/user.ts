import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import Plan, { IPlan } from "../planning/plan";

export interface IUser extends Model {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  plan: IPlan | null;
  token: string;
  resetToken: string;
}

@Table
class User extends Model implements IUser {
  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Column
  phoneNumber: string;

  @AllowNull(false)
  @Unique(true)
  @Column
  email: string;

  @Column
  startDate: string;

  @Column
  endDate: string;

  @Column
  password: string;

  @Column
  token: string;

  @Column
  resetToken: string;

  @ForeignKey(() => Plan)
  @Column
  planId: number;

  @BelongsTo(() => Plan)
  plan: Plan;
}
export default User;

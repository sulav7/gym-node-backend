import { Repository } from "sequelize-typescript";
import { IUser } from "./user";
import { IPlanService } from "../planning/planService";
import calculateEndDate from "../utils/helpers/dateHelper";
import Plan from "../planning/plan";
import sequelize from "../setup/databaseSetup";

export type IUpdatePlan = {
  startDate: string;
};

class UserService {
  private _userModel;
  private _planService;

  constructor(model: Repository<IUser>, planService: IPlanService) {
    this._userModel = model;
    this._planService = planService;
  }

  async getOneUser(id: string) {
    const getInfo = await this._userModel.findByPk(id, {
      include: {
        model: sequelize.getRepository(Plan),
        required: false,
      },
    });
    if (!getInfo) {
      throw {
        code: 404,
        messgae: "User not found",
      };
    }

    return getInfo;
  }

  async getUserByEmail(email: string) {
    const userEmail = await this._userModel.findOne({
      where: {
        email: email,
      },
    });
    return userEmail;
  }

  async updateInformation(
    body: IUser,
    id: string
  ): Promise<[affectedCount: number, affectedRows: IUser[]]> {
    // const checkUser = await this.getUserByEmail(body.email);
    // if (checkUser) {
    //   throw {
    //     message: "email already taken",
    //     code: 422,
    //   };
    // }
    const updateUser = await this._userModel.update(body, {
      where: {
        id: id,
      },
      returning: true,
    });
    return updateUser;
  }

  async updateUserPlan(userId: string, planId: string, data: IUpdatePlan) {
    console.log(userId, planId, data);
    const user = await this.getOneUser(userId);
    if (user.plan) {
      throw {
        code: 422,
        message: "Plan already selected",
      };
    }
    const plan = await this._planService.findPlan(planId);

    const endDate = calculateEndDate(data.startDate, plan.duration);

    return this._userModel.update(
      { planId, startDate: data.startDate, endDate },
      { where: { id: userId } }
    );
  }

  async deleteUser(id: string) {
    await this.getOneUser(id);
    const deleteUser = await this._userModel.destroy({
      where: { id: id },
    });

    return deleteUser;
  }
}

export default UserService;

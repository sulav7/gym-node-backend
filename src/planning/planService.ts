import { Repository } from "sequelize-typescript";
import Plan, { IPlan } from "./plan";

export interface IPlanService {
  findPlan(id: string): Promise<IPlan>;
}

class PlanService implements IPlanService {
  private _planModel;
  constructor(model: Repository<Plan>) {
    this._planModel = model;
  }

  async findPlan(id: string) {
    const findPlan = await this._planModel.findOne({
      where: { id },
    });
    if (!findPlan) {
      throw {
        code: 404,
        message: "Plan not found",
      };
    }
    return findPlan;
  }

  async findAllPlan() {
    const findPlan = await this._planModel.findAll({
      order: [["id", "asc"]],
    });
    return findPlan;
  }

  async createPlan(data: Array<IPlan>) {
    const promise: any[] = [];
    data.forEach((item) => {
      promise.push(
        this._planModel.findOrCreate({
          where: {
            ...item,
          },
        })
      );
    });
    await Promise.all(promise);
  }
}

export default PlanService;

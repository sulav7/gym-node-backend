import { planService } from ".";
import express from "express";
import { success } from "../utils/helpers/responseHelper";

class PlanController {
  async findPlan(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const findPLan = await planService.findAllPlan();
      return res
        .status(200)
        .json(success("plan listed", findPLan, res.statusCode));
    } catch (err) {
      next(err);
    }
  }
}

export default PlanController;

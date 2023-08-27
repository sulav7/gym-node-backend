import express from "express";
import { IUser } from "./user";
import { userService } from ".";
import { authService } from "../auth";
import { success } from "../utils/helpers/responseHelper";
import { IUpdatePlan } from "./userService";
class UserController {
  async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const body: IUser = req.body;
      const createUser = await authService.registerApplication(body);
      return res.status(200).json({
        message: "Application Registered",
        statusCode: 200,
        result: createUser,
      });
    } catch (err: any) {
      next(err);
    }
  }

  async find(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      //@ts-ignore
      const reqId = req.id;
      const id = req.params.id;

      const findUser = await userService.getOneUserWithCheck(id, reqId);
      return res.status(200).json({
        message: "user information displayed",
        statusCode: 200,
        result: findUser,
      });
    } catch (err: any) {
      next(err);
    }
  }

  async updateUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;
      const body: IUser = req.body;
      const update = await userService.updateInformation(body, id);
      return res.status(200).json({
        message: "user information updated",
        statusCode: 200,
        result: update,
      });
    } catch (err: any) {
      console.log(err);
      next(err);
    }
  }

  async updateUserPlan(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      //@ts-ignore
      const id = req.id;
      console.log(id);
      const planId = req.params.planId;
      const body: IUpdatePlan = req.body;
      console.log(body);
      const update = await userService.updateUserPlan(id, planId, body);
      return res
        .status(200)
        .json(success("plan updated", update, res.statusCode));
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  async deleteUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const id = req.params.id;
      const deleteUser = await userService.deleteUser(id);
      return res
        .status(200)
        .json(success("user deleted", deleteUser, res.statusCode));
    } catch (err) {
      next(err);
    }
  }

  async deleteUserPlans(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      // @ts-ignore
      const userId = req.id;
      console.log(userId);

      const deletePlan = await userService.deleteUserPlan(userId);
      return res
        .status(200)
        .json(success("plan removed", deletePlan, res.statusCode));
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;

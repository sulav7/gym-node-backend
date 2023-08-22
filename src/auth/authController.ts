import express from "express";
import { authService } from ".";
import { success, error } from "../utils/helpers/responseHelper";
class authController {
  async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const token = await authService.login(req.body.email, req.body.password);

      return res
        .status(200)
        .json(success("Login Successful", token, res.statusCode));
    } catch (err) {
      next(err);
    }
  }
}

export default authController;

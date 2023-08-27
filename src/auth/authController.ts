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

  async forgotPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const forgotPassword = await authService.forgotPassword(req.body.email);
      return res
        .status(200)
        .json(success("link send", forgotPassword, res.statusCode));
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const token = req.params.token;
      const resetPassword = await authService.resetPassword(token, req.body);
      return res
        .status(200)
        .json(
          success("password has been reset", resetPassword, res.statusCode)
        );
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default authController;

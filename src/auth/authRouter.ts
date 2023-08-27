import express from "express";

import { AuthController } from ".";
import validate from "../utils/helpers/validationHelper";
import { validateAuthentication } from "./authValidation";

const authRouter = express.Router();

authRouter.post(
  "/login",
  validate(validateAuthentication),
  AuthController.login
);
authRouter.post("/forgotPassword", AuthController.forgotPassword);
authRouter.patch("/resetPassword/:token", AuthController.resetPassword);

export default authRouter;

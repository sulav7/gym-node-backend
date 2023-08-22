import express from "express";
import validate from "../utils/helpers/validationHelper";
import userSchema from "../users/userValidation";
import { AuthController } from ".";
import auth from "../middleware/authMiddleware";

const authRouter = express.Router();

authRouter.post("/login", AuthController.login);

export default authRouter;

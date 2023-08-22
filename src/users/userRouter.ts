import express from "express";
import { userController } from ".";
import userSchema from "./userValidation";
import validate from "../utils/helpers/validationHelper";
import auth from "../middleware/authMiddleware";

const userRouter = express.Router();

userRouter.post("/create", validate(userSchema), userController.create);
userRouter.get("/:id", auth, userController.find);
userRouter.patch("/updatePlan/:planId", auth, userController.updateUserPlan);
userRouter.patch("/update/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;

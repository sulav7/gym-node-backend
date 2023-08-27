import express from "express";
import { userController } from ".";
import { userSchema, userUpdateDetailsSchema } from "./userValidation";
import validate from "../utils/helpers/validationHelper";
import auth from "../middleware/authMiddleware";

const userRouter = express.Router();

userRouter.post("/create", validate(userSchema), userController.create);
userRouter.get("/:id", auth, userController.find);
userRouter.patch(
  "/update/:id",
  validate(userUpdateDetailsSchema),
  userController.updateUser
);
userRouter.patch("/updatePlan/:planId", auth, userController.updateUserPlan);

userRouter.delete("/:id", userController.deleteUser);

userRouter.delete("/remove/plans", auth, userController.deleteUserPlans);

export default userRouter;

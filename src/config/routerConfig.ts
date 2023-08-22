import express from "express";
import userRouter from "../users/userRouter";
import authRouter from "../auth/authRouter";
import planRouter from "../planning/planRouter";

const router = express.Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/plan", planRouter);

export default router;

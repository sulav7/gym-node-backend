import express from "express";
import { planController } from ".";

const planRouter = express.Router();

planRouter.get("/", planController.findPlan);

export default planRouter;

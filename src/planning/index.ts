import sequelize from "../setup/databaseSetup";
import Plan from "./plan";
import PlanController from "./planController";
import PlanService from "./planService";

const planRepo = sequelize.getRepository(Plan);

const planService = new PlanService(planRepo);

const planController = new PlanController();

export { planService, planController };

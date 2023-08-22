import { planService } from "../planning";
import Plan from "../planning/plan";
import sequelize from "../setup/databaseSetup";
import User from "./user";
import UserController from "./userController";
import UserService from "./userService";

const userRepo = sequelize.getRepository(User);
const planRepo = sequelize.getRepository(Plan);

const userService = new UserService(userRepo, planService);

const userController = new UserController();

export { userService, userController };

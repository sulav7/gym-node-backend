import sequelize from "../setup/databaseSetup";
import User from "../users/user";
import authController from "./authController";
import AuthService from "./authService";

const userRepo = sequelize.getRepository(User);
const authService = new AuthService(userRepo);
const AuthController = new authController();

export { authService, AuthController };

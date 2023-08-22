import { Sequelize } from "sequelize-typescript";
import { databaseConfig } from "../config/databaseConfig";
import User from "../users/user";
import Plan from "../planning/plan";

const sequelize = new Sequelize({
  database: databaseConfig.database,
  dialect: "postgres",
  username: databaseConfig.username,
  password: databaseConfig.password,
  repositoryMode: true,
  models: [User, Plan],
  host: databaseConfig.host,
  logging: false,
});

export default sequelize;

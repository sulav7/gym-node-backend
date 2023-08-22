import "dotenv/config";
import { appConfig } from "./config/appConfig";
import app from "./config/express";
import sequelize from "./setup/databaseSetup";
import { planService } from "./planning";
import { PricingData } from "./utils/factory";

(async function () {
  try {
    await sequelize.authenticate().then(async () => {
      await sequelize.sync({ alter: true });
      await planService.createPlan(PricingData);
      console.log("Database Connected Sucessfully");
    });

    app.listen(appConfig.port, () => {
      console.log(`app is running at ${appConfig.port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();

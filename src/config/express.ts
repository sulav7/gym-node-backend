import express from "express";
import cors from "cors";
import router from "./routerConfig";
import { error } from "../utils/helpers/responseHelper";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/v1", router);

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    const errors = error(err?.message, err?.code);
    return res.status(errors.code).json({
      message: errors.message,
      code: errors.code,
    });
  }
);

export default app;

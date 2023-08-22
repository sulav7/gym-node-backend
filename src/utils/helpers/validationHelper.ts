import express, { NextFunction, response } from "express";
import { ZodSchema } from "zod";
import { validateError } from "./responseHelper";

const validate =
  (schema: ZodSchema) =>
  (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      const data = schema.parse(req.body);
      req.body = data;
      next();
    } catch (err: any) {
      return res.status(200).json({
        message: "validation error",
        error: validateError(err),
        status: response.statusCode,
      });
    }
  };

export default validate;

import express from "express";

import jwt, { verify } from "jsonwebtoken";
import { jwtConfig } from "../config/jwtConfig";
import { tokens } from "../utils/helpers/tokenHelper";

const auth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let reqToken = req.headers.authorization;

    if (!reqToken) {
      throw {
        message: "Token not presenet",
        code: 403,
      };
    }
    let token = tokens(reqToken);

    jwt.verify(token, jwtConfig.accessSecret, (err: any, decoded: any) => {
      if (err) {
        throw {
          message: "Unauthorized",
          code: 403,
        };
      }
      //@ts-ignore
      req.id = decoded.id;
      next();
    });
  } catch (err) {
    next(err);
  }
};

export default auth;

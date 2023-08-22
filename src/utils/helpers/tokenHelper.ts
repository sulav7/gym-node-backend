import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/jwtConfig";

const generateToken = (token: any) => {
  return jwt.sign(token, jwtConfig.accessSecret, { expiresIn: "24hr" });
};

const tokens = (token: string) => {
  const verifyToken: string = token.split(" ")[1];
  return verifyToken;
};

export function verifyToken(token: string) {
  return jwt.verify(token, jwtConfig.accessSecret);
}

export { generateToken, tokens };

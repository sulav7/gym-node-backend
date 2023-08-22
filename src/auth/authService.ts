import { Repository } from "sequelize-typescript";
import { IUser } from "../users/user";

import { generateToken } from "../utils/helpers/tokenHelper";
import {
  bcryptedPassword,
  comparePassword,
} from "../utils/helpers/bcryptHelper";

class AuthService {
  private _userModel;
  constructor(model: Repository<IUser>) {
    this._userModel = model;
  }

  async registerApplication(body: IUser) {
    // @ts-ignore
    delete body.confirmPassword;
    body.email = body.email.toLowerCase();
    const checkUser = await this._userModel.findOne({
      where: { email: body.email },
    });

    if (checkUser) {
      throw {
        code: 422,
        message: "email already taken",
      };
    }
    const password = body.password;

    const hashedPassword = await bcryptedPassword(password);

    const createApplication = await this._userModel.create({
      ...body,
      password: hashedPassword,
    });
    return createApplication;
  }

  async login(email: string, password: string) {
    const user = await this._userModel.findOne({
      where: { email },
    });

    if (!user) {
      throw {
        message: "Invalid Credentials",
        code: 404,
      };
    }
    const checkPassword = await comparePassword(password, user.password);
    if (!checkPassword) {
      throw {
        message: "password or email didn't matched",
      };
    }
    const accessToken = generateToken({
      id: user.id,
    });
    return {
      user,
      accessToken,
    };
  }
}

export default AuthService;

import { Repository } from "sequelize-typescript";
import { IUser } from "../users/user";

import { generateToken, token } from "../utils/helpers/tokenHelper";
import {
  bcryptedPassword,
  comparePassword,
} from "../utils/helpers/bcryptHelper";
import sendEmail from "../config/nodeMailer";

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

    const createApplication = await this._userModel.create(
      {
        ...body,
        password: hashedPassword,
        token: token(),
      },
      { raw: true }
    );

    sendEmail({
      from: "sulav niroula <sulavniroula91@gmail.com>",
      to: `${createApplication.email}`,
      subject: "Welcome To Our Gym",
      html: "Welcome Sir",
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

  async forgotPassword(email: string) {
    const user = await this._userModel.findOne({
      where: { email },
    });
    if (!user) {
      throw {
        code: 404,
        message: "email not found",
      };
    }
    const resetToken = token();
    await this._userModel.update(
      { resetToken },
      {
        where: { email: email },
      }
    );
    sendEmail({
      from: "sulav niroula <sulavniroula91@gmail.com>",
      to: `${user?.email}`,
      subject: "Reset Password",
      html: `<a href="http://localhost:5173/resetPassword/${resetToken}">Reset Password</a>`,
    });
  }

  async resetPassword(resetToken: string, body: IUser) {
    const checkUser = await this._userModel.findOne({ where: { resetToken } });
    if (!checkUser) {
      throw {
        code: 404,
        message: "email not found",
      };
    }
    const hashedPassword = await bcryptedPassword(body.password);
    await this._userModel.update(
      { password: hashedPassword, resetToken: null },
      {
        where: {
          id: checkUser.id,
        },
      }
    );
  }
}

export default AuthService;

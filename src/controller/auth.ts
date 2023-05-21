import { RequestHandler } from "express";
import { UserCreateSchema, UserLoginSchema } from "../zodSchema/user";
import User from "../models/user";
import { ErrorHandler } from "../middleware/error";
import { genSalt, hash, compare } from "bcrypt";
import { sendCookie } from "../utils/feature";

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, username, isAdmin } = UserCreateSchema.parse(
      req.body
    );

    let user = await User.findOne({
      email,
      username: username,
    });

    if (user) throw new ErrorHandler("User already exists", 400);

    const salt = await genSalt(10);

    const hashPassword = await hash(password, salt);

    user = await User.create({
      email,
      username,
      isAdmin,
      password: hashPassword,
    });

    sendCookie(user._id.toString(), user.isAdmin, res);
    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = UserLoginSchema.parse(req.body);
    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) throw new ErrorHandler("User is not registered", 400);
    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new ErrorHandler("Invalid Email or Password", 401);

    sendCookie(user._id.toString(), user.isAdmin, res);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: hashedPassword, isAdmin, ...restUser } = user.toJSON();
    return res.status(201).json({
      message: `Welcome back,${user.username}`,
      data: restUser,
    });
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = (req, res, next) => {
  try {
    res.cookie("access_token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    return res.status(200).json("OK");
  } catch (error) {
    next(error);
  }
};

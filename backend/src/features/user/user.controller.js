import UserRepository from "./user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  //Generate token function for auth
  generateToken(data, res) {
    const token = jwt.sign(
      {
        username: data.username,
        userId: data._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "180d" }
    );
    res.cookie("authToken", token, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return token;
  }

  //Sign in controller
  async signIn(req, res, next) {
    const { username, password } = req.body;
    try {
      let user = await this.userRepository.findUser(username);
      if (!user) {
        return res.status(404).send({
          success: false,
          message:
            "Invalid username or User not found with the given username. Please check the username and try again.",
        });
      }
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (!passwordMatched) {
        return res.status(400).send({
          success: false,
          message: "Wrong password Pleae check the password and try again.",
        });
      }
      const token = this.generateToken(
        {
          username: user.username,
          userId: user._id,
        },
        res
      );
      return res.status(200).send({
        success: true,
        data: user,
        token,
        message: "User sign in successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  //Signup controller
  async signup(req, res, next) {
    const { name, username, password } = req.body;
    try {
      let user = await this.userRepository.signup(name, username, password);
      if (!user) {
        return res.status(400).send({
          success: false,
          message: "Unable to create user.",
        });
      }
      return res.status(201).send({
        success: true,
        data: user,
        message: "User created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  //Logout controller Function
  async signOut(req, res, next) {
    try {
      const { userId } = req.body;
      const user = await this.authRepository.findById(userId);

      if (!user) {
        return res
          .status(500)
          .send({ success: false, message: "Server Error, Unable to logout" });
      }
      user.fcmToken = "";
      await user.save();
      return res
        .status(200)
        .send({ success: true, message: "User Sign out successfully." });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, message: "Server Error, Unable to logout" });
    }
  }
}

export default UserController;

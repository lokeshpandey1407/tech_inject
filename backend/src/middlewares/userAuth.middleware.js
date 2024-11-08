import jwt from "jsonwebtoken";
import UserRepository from "../features/user/user.repository.js";

const User = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing or invalid token",
      });
    }

    const authToken = authHeader.split(" ")[1];
    if (!authToken) {
      return res.status(400).json({
        success: false,
        message: "unauthorized Access! login to continue!",
      });
    } else {
      const payload = jwt.verify(authToken, process.env.SECRET_KEY);
      const userRepository = new UserRepository();
      const user = await userRepository.findById(payload.userId);
      req.username = payload.username;
      req.userId = payload.userId;
    }
  } catch (error) {
    console.log(error);
    if (error.message == "jwt expired") {
      return res.status(401).json({
        success: false,
        message: "Token Expired. Please login again to continue.",
      });
    }
    return res.status(400).json({
      success: false,
      message: "Unauthorized Access! login to continue!",
    });
  }
  next();
};
module.exports = User;

import { Router } from "express";
import UserController from "./user.controller.js";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/signup", (req, res, next) => {
  userController.signup(req, res, next);
});
userRoutes.post("/signin", (req, res, next) => {
  userController.signIn(req, res, next);
});

export default userRoutes;

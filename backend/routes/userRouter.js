import express from "express";
import * as user from "../controllers/userController.js";
import { authenticateToken } from "../middleware/jwt.js";

const userRouter = express.Router();

userRouter.post("/register", user.register);
userRouter.post("/login", user.login);
userRouter.post("/logout", user.logout);
userRouter.get("/verify-token", authenticateToken, user.verifyToken);

export default userRouter;

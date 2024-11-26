import express from "express";
import * as application from "../controllers/applicationController.js";
import { authenticateToken } from "../middleware/jwt.js";

const applicationRouter = express.Router();

applicationRouter
  .get("/", authenticateToken, application.getApplications)
  .post("/", authenticateToken, application.createApplication)
  .put("/:id", authenticateToken, application.updateApplication)
  .delete("/:id", authenticateToken, application.deleteApplication);

export default applicationRouter;

import { Router } from "express";
import { userRouter } from "./user.routes.js";

const indexRoute = Router();

indexRoute.use("/users", userRouter);

export { indexRoute };

import express from "express";

import {
  getUserC,
  getUsersC,
  addUserC,
  depositToUserC,
  updateUserC,
  setCreditC,
  withdrawC,
  transferC,
  deleteUserC,
} from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.get("/:id", getUserC);
userRouter.get("/", getUsersC);
userRouter.post("/", addUserC);
userRouter.put("/deposit/:id", depositToUserC);
userRouter.put("/update", updateUserC);
userRouter.put("/credit/:id", setCreditC);
userRouter.put("/withdraw/:id", withdrawC);
userRouter.put("/transfer/:id", transferC);
userRouter.delete("/delete/:id", deleteUserC);

export { userRouter };

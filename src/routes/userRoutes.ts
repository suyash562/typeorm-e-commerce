import { Router } from "express";
import { addProductController, addUserController, getOrderItemsGreaterThanAvgPrice, getUserOrdersController, orderProductController } from "../controller/userController";

export const userRouter = Router();

userRouter.post("/add", addUserController);
userRouter.post("/order", orderProductController);
userRouter.post("/product", addProductController);
userRouter.post("/get-orders", getUserOrdersController);
userRouter.get("/orderItemsWithMorePrice", getOrderItemsGreaterThanAvgPrice);

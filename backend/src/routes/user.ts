import { Router, Response } from "express";
import * as UserController from "../controllers/user";
import { APIResponse, TrashRequest } from "../types/types";
import { isAuthenticated } from "../middleware/auth";

const userRouter = Router();

userRouter.post(
    "/signup",
    async (req: TrashRequest, res: Response) => {
        const response: APIResponse = await UserController.createUser(req);
        res.json(response);
    }
);

userRouter.post(
    "/login",
    async (req: TrashRequest, res: Response) => {
        const response: APIResponse = await UserController.verifyUser(req);
        res.json(response);
    }
);

userRouter.get(
    "/",
    isAuthenticated,
    async (req: TrashRequest, res: Response) => {
        const response: APIResponse = await UserController.getUser(req);
        res.json(response);
    }
)

export default userRouter;
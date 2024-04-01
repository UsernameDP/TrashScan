import express, { json, urlencoded, Request, Response } from "express";

import loggingMiddleware from "./middleware/logging";
import logger from "./utils/logger";
import { APIResponse } from "./types/types";
import userRouter from "./routes/user";

const app: express.Application = express();
const port: number = parseInt(process.env["PORT"] ?? "3000");

app.use(loggingMiddleware);
app.use(urlencoded({ extended: true }));
app.use(json());

app.set("trust proxy", 1);

app.use("/user", userRouter);

app.get("/", (_: Request, res: Response) => {
    res.json(
        {
            message: "ok",
            data: {
                uptime: process.uptime()
            }
        } as APIResponse
    );

    res.status(200);
})

app.listen(port, () => {
    logger.info(`TrashScan API Server listening at port: ${port}`);
});
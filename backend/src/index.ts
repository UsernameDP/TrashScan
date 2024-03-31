import express, { json, urlencoded } from "express";

import loggingMiddleware from "./middleware/logging";
import logger from "./utils/logger";

const app: express.Application = express();
const port: number = parseInt(process.env["PORT"] ?? "3000");

app.use(loggingMiddleware);
app.use(urlencoded({ extended: true }));
app.use(json());

app.set("trust proxy", 1);

app.listen(port, () => {
    logger.info(`TrashScan API Server listening at port: ${port}`);
});
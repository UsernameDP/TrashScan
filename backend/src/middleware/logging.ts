import morgan, { StreamOptions } from "morgan";
import logger from "../utils/logger";

const stream: StreamOptions = {
    write: (msg: string) => logger.http(msg)
}

const loggingMiddleware = morgan(
    "(:method) :url :status :res[content-length] ~ :response-time ms",
    { stream }
)

export default loggingMiddleware;
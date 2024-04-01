import { resolve } from "path";
import { addColors, createLogger, format, transports } from "winston";

const logPath = process.env["LOG_PATH"] ?? "./logs";

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    debug: "white"
}

const levels = {
    error: 0,
    warning: 1,
    info: 2,
    debug: 3
}

addColors(colors);

const timestampFormat = format.timestamp({ format: "DD-MM-YYYY HH:mm:ss.SSS" });
const outputFormat = format.printf(log => `${log["timestamp"]}\t${log.level}: ${log.message}`);

const fileOutputFormat = format.combine(
    timestampFormat,
    outputFormat
);

const consoleOutputFormat = format.combine(
    timestampFormat,
    format.colorize({ all: true }),
    outputFormat
);

const logger = createLogger({
    levels: levels,
    format: consoleOutputFormat,
    transports: [
        new transports.File({
            filename: resolve(logPath, "run.log"),
            format: fileOutputFormat
        }),
        new transports.Console({
            format: consoleOutputFormat
        })
    ],
    exceptionHandlers: [
        new transports.File({
            filename: resolve(logPath, "exceptions.log"),
            format: fileOutputFormat
        }),
        new transports.Console({
            format: consoleOutputFormat
        })
    ]
});

export default logger;

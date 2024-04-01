import { verify } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { APIResponse, Decoded, TrashRequest } from "../types/types";
import logger from "../utils/logger";

export async function isAuthenticated(
    req: TrashRequest,
    res: Response, 
    next: NextFunction
): Promise<void> {
    const { authorization } = req.headers;

    if (!authorization) {
        logger.error(`Authentication middleware: no 'authorization' header found.`);
        res.json(
            {
                message: "error",
                data: {
                    message: "No 'authorization' header found."
                }
            } as APIResponse
        );
        return;
    }

    verify(authorization as string, process.env["TOKEN_SECRET"] as string, (error, decoded) => {
        if (error) {
            logger.error(`Authentication middleware: invalid access token supplied.`);
            res.json(
                {
                    message: "error",
                    data: {
                        message: "Invalid token provided, please re-login."
                    }
                } as APIResponse
            );
            return;
        } 
        
        const { id, username } = decoded as Decoded;

        req.decoded = {
            id, 
            username
        } as Decoded; 

        next();
    });
} 
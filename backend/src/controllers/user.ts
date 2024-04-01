import { APIResponse, Decoded, TrashRequest } from "../types/types";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import prisma from "../db";
import logger from "../utils/logger";

function generateAccessToken(payload: object): string {
    return sign(payload, process.env["TOKEN_SECRET"] as string);
}

async function findUser(username: string) {
    const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    });

    return user;
}

async function isUsernameAvailable(username: string): Promise<boolean> {
    const user = await findUser(username);
    if (user) 
        return false;
    return true;
}

export async function createUser(req: TrashRequest): Promise<APIResponse> {
    const { username, password } = req.body;
    const hashedPassword: string = await hash(password, 10);

    const available = await isUsernameAvailable(username);

    if (!available) {
        logger.error(`Username, ${username}, unavailable.`);
        return {
            message: "error",
            data: {
                message: `Username, ${username}, unavailable.`
            }
        } as APIResponse;
    }

    const result = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword
        }
    });

    
    const accessToken = generateAccessToken({
        id: result.id,
        username: username
    });

    logger.info(`User with username, ${username}, created.`);
    return {
        message: "ok",
        data: {
            id: result.id,
            username: username,
            token: accessToken
        }
    } as APIResponse;
}

export async function getUser(req: TrashRequest): Promise<APIResponse> {
    const { username } = req.decoded as Decoded;
    const user = await findUser(username);

    if (!user) {
        logger.error(`User, ${username}, doesn't exist.`);
        return {
            message: "error",
            data: {
                message: `User, ${username}, doesn't exist.`
            }
        } as APIResponse;
    }

    return {
        message: "ok",
        data: {
            id: user.id,
            username: user.username
        }
    } as APIResponse;
}

export async function verifyUser(req: TrashRequest): Promise<APIResponse> {
    const { username, password } = req.body;

    const result = await findUser(username);

    if (!result) {
       logger.error(`User, ${username}, doesn't exist.`);
        return {
            message: "error",
            data: {
                message: `User, ${username}, doesn't exist.`
            }
        } as APIResponse;
    }

    const match = await compare(password, result.password);

    if (!match) {
        logger.error(`Provided username, ${username}, and password did not match.`);
        return {
            message: "error",
            data: {
                message: `Provided username and password did not match.`
            }
        } as APIResponse;
    }

    const accessToken = generateAccessToken({
        id: result.id,
        username: username
    });

    logger.info(`User with username, ${username}, verified and respective access token generated.`);
    return {
        message: "ok",
        data: {
            id: result.id,
            username: username,
            token: accessToken
        }
    }
}
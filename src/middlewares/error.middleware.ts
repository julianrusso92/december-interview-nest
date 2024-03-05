import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/appError";
import { errorHandler } from "../utils/errors/errorHandler";
import { HttpCode } from "../utils/errors/statusCodes";

export const jsonSyntaxHandlerError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError) {
        throw new AppError({
            httpCode: HttpCode.BAD_REQUEST,
            description: 'Sintaxis JSON incorrecta',
        });
    } else {
        next(err);
    }
}

export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler.handleError(err, res);
}

export const invalidPathHandler = (req: Request, res: Response) => {
    throw new AppError({
        httpCode: HttpCode.NOT_FOUND,
        description: 'Ruta incorrecta',
    });
}
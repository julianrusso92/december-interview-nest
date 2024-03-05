import { Response } from "express";
import { AppError } from "./appError";
import { HttpCode } from "./statusCodes";

class ErrorHandler {
    private isTrustedError(error: Error): boolean {
        if (error instanceof AppError) {
            return error.isOperational;
        }

        return false;
    }

    private handleTrustedError(error: AppError, response: Response): void {
        console.log("🚀 ~ file: errorHandler2.ts:15 ~ ErrorHandler ~ handleTrustedError ~ error:", error.message)
        const errors: Array<any> = [];
        if (error) {
            errors.push({ "message": error.message });
        }

        response.status(error.httpCode).json({ errors: errors });
    }

    private handleCriticalError(error: Error | AppError, response?: Response): void {
        if (response) {
            const errors: Array<any> = [];
            if (error) {
                errors.push({ "message": error.message });
            }

            response
                .status(HttpCode.INTERNAL_SERVER_ERROR)
                .json({ errors: errors });
        }

        console.log('Application encountered a critical error. Exiting');
        process.exit(1);
    }

    public handleError(error: Error | AppError, response?: Response): void {
        if (this.isTrustedError(error) && response) {
            this.handleTrustedError(error as AppError, response);
        } else {
            this.handleCriticalError(error, response);
        }
    }
}

export const errorHandler = new ErrorHandler();
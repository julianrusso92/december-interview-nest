import { NextFunction, Request, Response } from 'express';
import { Schema, ValidationResult } from 'joi';

interface ValidationOptions {
    body?: Schema;
    params?: Schema;
    query?: Schema;
}

export const validateSchema = (options: ValidationOptions) => (req: Request, res: Response, next: NextFunction) => {
    const { body, params, query } = options;

    if (body) {
        const { error: bodyError } = validateRequest(req.body, body);
        if (bodyError) {
            return handleValidationError(res, bodyError);
        }
    }

    if (params) {
        const { error: paramsError } = validateRequest(req.params, params);
        if (paramsError) {
            return handleValidationError(res, paramsError);
        }
    }

    if (query) {
        const { error: queryError } = validateRequest(req.query, query);
        if (queryError) {
            return handleValidationError(res, queryError);
        }
    }

    next();
};

const validateRequest = (data: any, schema: Schema): ValidationResult => {
    return schema.validate(data, { abortEarly: false });
};

const handleValidationError = (res: Response, error: ValidationResult['error']) => {
    const errors: Array<any> = [];

    error?.details.forEach((detail) => {
        errors.push({ [detail.context?.key as string]: detail.message.replace(/"/g, '') });
    });

    res.status(422).json({ statusCode: 422, errors: errors });
};
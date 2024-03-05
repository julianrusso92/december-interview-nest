interface ValidationError extends Error {
    validationErrors: string[];
}

export function createValidationError(message: string, fields: string[]): ValidationError {
    const error: ValidationError = new Error(message) as ValidationError;
    error.validationErrors = fields;
    return error;
}
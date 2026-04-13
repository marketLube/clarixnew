import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import type { ValidationError } from 'express-validator';
import { ApiError } from '../utils/index.js';


export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map((error: ValidationError) => {
            if (error.type === 'field') {
                return {
                    field: error.path,
                    message: error.msg,
                    value: error.value,
                };

            }
            return {
                message: error.msg,
            };
        });

        throw new ApiError(
            422,
            'Validation failed',
            formattedErrors
        );
    }

    next();
};

export const validateFirst = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array()[0];

        if (!firstError) {
            throw new ApiError(422, 'Validation failed');
        }

        let message = 'Validation failed';
        if (firstError.type === 'field') {
            message = firstError.msg;
        }

        throw new ApiError(422, message);
    }

    next();
};

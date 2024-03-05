import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { AppError } from '../utils/errors/appError';
import { HttpCode } from '../utils/errors/statusCodes';
interface AuthError extends Error {
    message: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: AuthError, user: any, info: { message: string }) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            throw new AppError({
                httpCode: HttpCode.UNAUTHORIZED,
                description: 'Acceso no autorizado',
            });
        }
        req.user = user;
        next();
    })(req, res, next);
};

export default authMiddleware;
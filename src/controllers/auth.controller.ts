import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        const user = await AuthService.validateCredentials(username, password);
        const token = AuthService.generateJwtToken(user!);
        res.json({ token });
    } catch (error) {
        console.log("🚀 ~ file: auth.controller.ts:11 ~ login ~ error:", error)
        next(error);
    }
}

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { PrismaClient, User } from '@prisma/client';
import { config } from '../config/config';
import { createValidationError } from '../utils/errors/error';
import { AppError } from '../utils/errors/appError';
import { HttpCode } from '../utils/errors/statusCodes';

const prisma = new PrismaClient()

const AuthService = {
    async login(username: string, password: string) {

        // Lógica de autenticación
    },
    async validateCredentials(username: string, password: string): Promise<User | null> {
        const user: User | null = await prisma.user.findUnique({
            where: {
                email: username
            },
        });

        if (!user) {
            throw new AppError({
                httpCode: HttpCode.UNPROCESSABLE_ENTITY,
                description: 'Usuario o contraseña incorrecta',
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError({
                httpCode: HttpCode.UNPROCESSABLE_ENTITY,
                description: 'Usuario o contraseña incorrecta',
            });
            // throw createValidationError('Invalid username or password', ['password']);
        }

        return user;
    },
    generateJwtToken(user: User): string {
        const payload = { sub: user.id };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.expiresIn });
        return token;
    },
};

export default AuthService;

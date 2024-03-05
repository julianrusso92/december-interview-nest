import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { config } from '../../../config/config';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient()

const jwtOptions = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export const jwtStrategy =
    new JwtStrategy(jwtOptions, async (payload, done) => {
        try {
            const user: User | null = await prisma.user.findUnique({
                where: {
                    id: payload.sub
                },
            });

            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    })

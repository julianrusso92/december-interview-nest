import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient()

const UserService = {
    async get(email: string): Promise<User | null> {
        const user: User | null = await prisma.user.findUnique({
            where: {
                email: email
            },
        });
        console.log("🚀 ~ file: user.service.ts:12 ~ get ~ users:", user)
        return user;
    },
};

export default UserService;

import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOne(username: string): Promise<User | undefined> {
        return this.prisma.user.findFirst({ where: { email: username } });
    }
    async findById(id: string): Promise<User | undefined> {
        return this.prisma.user.findFirst({ where: { id: id } });
    }
}

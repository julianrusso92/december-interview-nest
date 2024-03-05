import { Prisma, PrismaClient } from '@prisma/client';
import { TransactionParams } from '../controllers/transactions.controller';
const prisma = new PrismaClient()

export const transactions = async ({ from, to, sourceAccountID, userId, pageSize = 5, cursor }: TransactionParams) => {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    const where: Prisma.TransactionWhereInput = {
        ...(from && to ? { date: { gte: fromDate, lte: toDate } } : from ? { date: { gte: fromDate } } : to ? { date: { lte: toDate } } : {}),
        ...(sourceAccountID ? { accountFromId: sourceAccountID } : {}),
    };

    const take = Number(pageSize);

    const transactions: any = await prisma.transaction.findMany({
        take: take,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
            ...where,
            AND: [
                { accountFrom: { userId: userId } }
            ]
        },
        orderBy: {
            date: 'desc',
        },
        select: {
            accountFromId: true,
            accountToId: true,
            amount: true,
            date: true,
            description: true,
            id: true,
            accountFrom: {
                select: {
                    currency: true
                }
            }
        }
        // include: {
        //     accountFrom: true,
        //     accountTo: true,
        //     }
    });


    const hasNextPage = transactions.length === take;
    const pageInfo = {
        pageSize,
        hasNextPage,
        endCursor: hasNextPage ? transactions[transactions.length - 1].id : null,
    };



    return {
        transactions,
        pageInfo,
    };
}

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(transactionDto: TransactionDto, userId: string) {
    const { from, to, sourceAccountID, pageSize, cursor } = transactionDto;

    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    const where: Prisma.TransactionWhereInput = {
      ...(from && to
        ? { date: { gte: fromDate, lte: toDate } }
        : from
        ? { date: { gte: fromDate } }
        : to
        ? { date: { lte: toDate } }
        : {}),
      ...(sourceAccountID ? { accountFromId: sourceAccountID } : {}),
    };

    const take = Number(pageSize);

    const transactions: any = await this.prisma.transaction.findMany({
      take: take,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        ...where,
        AND: [{ accountFrom: { userId: userId } }],
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
            currency: true,
          },
        },
      },
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

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }
}

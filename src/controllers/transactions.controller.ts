import { NextFunction, Request, Response } from 'express';
import { transactions } from '../services/transactions.service';
import { User } from '@prisma/client';
import { parse } from 'url';

export interface TransactionParams {
    from?: string;
    to?: string;
    sourceAccountID?: string;
    userId: string;
    pageSize?: number,
    cursor?: string
}

export const getTransactions = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const parsedUrl = parse(req.url, true);
        const { from, to, sourceAccountID, pageSize, cursor } = parsedUrl.query;

        const user: User = req.user as User;

        const param: TransactionParams = { from, to, sourceAccountID, userId: user.id, pageSize, cursor } as TransactionParams;
        const data = await transactions(param);

        res.status(200).json({ statusCode: 200, ...data });
    } catch (error) {
        next(error);
    }
}
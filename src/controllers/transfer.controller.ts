import { NextFunction, Request, Response } from 'express';
import { transfer } from '../services/transfer.service';

export interface TransferRequest {
    accountFrom: string;
    accountTo: string;
    amount: number;
    date: string;
    description: string;
}

export const postTransfer = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { accountFrom, accountTo, amount, date, description }: TransferRequest = req.body;

        const result = await transfer({ accountFrom, accountTo, amount, date, description });

        res.status(200).json({ data: result });
    } catch (error) {
        console.log("🚀 ~ file: auth.controller.ts:23 ~ login ~ error:", error)
        // Manejo de errores
        next(error);
    }
}

import { PrismaClient } from '@prisma/client';
import { TransferRequest } from "../controllers/transfer.controller";
import axiosApiLayerInstance from "../utils/axios/axios.intance";
import { AppError } from "../utils/errors/appError";
import { HttpCode } from "../utils/errors/statusCodes";
const prisma = new PrismaClient()

export const transfer = async ({ accountFrom: accountFromId, accountTo: accountToId, amount, date, description }: TransferRequest) => {
    const transferResult = await prisma.$transaction(async (prisma) => {
        const accountFrom = await prisma.account.findUnique({
            where: {
                id: accountFromId
            },
            include: {
                currency: true
            }
        });

        if (!accountFrom) {
            throw new AppError({
                httpCode: HttpCode.NOT_FOUND,
                description: 'Cuenta de origen inválida',
            });
        }

        const accountTo = await prisma.account.findUnique({
            where: {
                id: accountToId
            },
            include: {
                currency: true
            }
        });

        if (!accountTo) {
            throw new AppError({
                httpCode: HttpCode.NOT_FOUND,
                description: 'Cuenta de destino inválida',
            });
        }

        let amountTo = amount;
        const isSameCurrency = accountFrom.currencyId === accountTo.currencyId
        if (!isSameCurrency) {
            const apiResult: any = await axiosApiLayerInstance.get(`/convert?from=${accountFrom.currency.symbol}&to=${accountTo.currency.symbol}&amount=${amount}`)
            console.log("🚀 ~ file: transfer.service.ts:60 ~ transfer ~ apiResult:", apiResult.data)
            if (apiResult.data.success) {
                amountTo = apiResult.data.result;
            } else {
                throw new AppError({
                    httpCode: HttpCode.INTERNAL_SERVER_ERROR,
                    description: 'Error al obtener cotización',
                });
            }
        }

        const isSameOwner = accountFrom.userId === accountTo.userId

        const sameOwnerFee = 0;
        const differentOwnerFee = 0.01; //1%

        const feeToAplied = 1 + (isSameOwner ? sameOwnerFee : differentOwnerFee);
        const amountFromWithFee = amount * feeToAplied;

        const transaction = await prisma.transaction.create({
            data: {
                accountFromId: accountFromId,
                accountToId: accountToId,
                amount: amount,
                // date: date, Se esta guardando el date now alcrearla.
                description: description
            }
        });

        const accountFromAfterSend = await prisma.account.update({
            where: {
                id: accountFromId
            },
            data: {
                balance: {
                    decrement: amountFromWithFee
                }
            }
        });

        if (accountFromAfterSend.balance.lessThan(0)) {
            throw new AppError({
                httpCode: HttpCode.NOT_FOUND,
                description: 'Fondos insuficientes para realizar la transferencia.',
            });
        }

        await prisma.account.update({
            where: {
                id: accountToId
            },
            data: {
                balance: {
                    increment: amountTo
                }
            }
        });

        return transaction;
    }, {
        // isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        timeout: 30000
    });

    return transferResult;
}

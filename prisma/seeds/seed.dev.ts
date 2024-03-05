import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
async function main() {

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash("Julian123$", salt);
    console.log({ hashedPassword })

    const currencyIdUSD = await prisma.currency.findFirst({
        where: {
            symbol: 'USD',
        },
        select: {
            id: true,
        },
    });

    const currencyIdUYU = await prisma.currency.findFirst({
        where: {
            symbol: 'UYU',
        },
        select: {
            id: true,
        },
    });

    const currencyIdEUR = await prisma.currency.findFirst({
        where: {
            symbol: 'EUR',
        },
        select: {
            id: true,
        },
    });

    const currencyIdARG = await prisma.currency.findFirst({
        where: {
            symbol: 'ARS',
        },
        select: {
            id: true,
        },
    });
    console.log("🚀 ~ file: seed.dev.ts:46 ~ main ~ currencyIdARG:", currencyIdARG)

    const julianr92 = await prisma.user.upsert({
        where: { email: 'julianr92@gmail.com' },
        update: {},
        create: {
            email: 'julianr92@gmail.com',
            name: 'Julian',
            surname: 'Russo',
            password: hashedPassword,
            accounts: {
                create: [{
                    currencyId: currencyIdUSD!.id,
                    balance: 1000
                },
                {
                    currencyId: currencyIdUSD!.id,
                    balance: 1000
                },
                {
                    currencyId: currencyIdUYU!.id,
                    balance: 1000
                },
                {
                    currencyId: currencyIdEUR!.id,
                    balance: 1000
                },
                {
                    currencyId: currencyIdARG!.id,
                    balance: 1000
                }],
            }
        },
    })

    const russoj92 = await prisma.user.upsert({
        where: { email: 'russoj92@gmail.com' },
        update: {},
        create: {
            email: 'russoj92@gmail.com',
            name: 'Russo',
            surname: 'J',
            password: hashedPassword,
            accounts: {
                create: [{
                    currencyId: currencyIdUSD!.id,
                    balance: 1000
                },
                {
                    currencyId: currencyIdUSD!.id,
                    balance: 1000
                },
                {
                    currencyId: currencyIdUYU!.id,
                    balance: 1000
                },
                {
                    currencyId: currencyIdEUR!.id,
                    balance: 1000
                },
                {
                    currencyId: currencyIdARG!.id,
                    balance: 1000
                }],
            }
        },
    })

    console.log({ julianr92, russoj92 })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function seed() {

    await prisma.currency.createMany({
        data: [
            { symbol: 'UYU', description: 'Peso Uruguayo' },
            { symbol: 'USD', description: 'Dólar Americano' },
            { symbol: 'EUR', description: 'Euro' },
            { symbol: 'ARS', description: "Argentine Peso" }
        ],
    });

    console.log('Datos iniciales de Currency insertados con éxito.');
}

seed()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
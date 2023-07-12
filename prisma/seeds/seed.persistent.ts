import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.currency.createMany({
    data: [
      { symbol: 'UYU', description: 'Peso Uruguayo' },
      { symbol: 'USD', description: 'Dólar Americano' },
      { symbol: 'EUR', description: 'Euro' },
      { symbol: 'ARS', description: 'Argentine Peso' },
    ],
  });

  console.log('Datos iniciales de Currency insertados con éxito.');
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

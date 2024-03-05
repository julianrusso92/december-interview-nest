import { PrismaClient } from '@prisma/client';
import app from './app';
import { config } from './config/config';

const port = config.port;

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: any) => {
    console.log('Error connecting to MySQL database:', error);
  });
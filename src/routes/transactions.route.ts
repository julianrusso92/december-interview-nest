import express from 'express';
import { getTransactions } from '../controllers/transactions.controller';
import authMiddleware from '../middlewares/auth.middleware';
import { validateSchema } from '../middlewares/schemaValidator.middleware';
import transactionsSchema from '../validators/transactions.validator';

const transactionsRoute = express.Router();

transactionsRoute.get('/', authMiddleware, validateSchema({ params: transactionsSchema.transactions }), getTransactions);

export default transactionsRoute;
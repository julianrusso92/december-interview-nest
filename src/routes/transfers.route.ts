import express from 'express';
import { postTransfer } from '../controllers/transfer.controller';
import authMiddleware from '../middlewares/auth.middleware';
import { validateSchema } from '../middlewares/schemaValidator.middleware';
import transferSchema from '../validators/transfer.validator';

const transferRoute = express.Router();

transferRoute.post('/', authMiddleware, validateSchema({ body: transferSchema.transfer }), postTransfer);

export default transferRoute;
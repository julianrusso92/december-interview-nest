import express from 'express';
import { login } from '../controllers/auth.controller';
import { validateSchema } from '../middlewares/schemaValidator.middleware';
import authSchema from '../validators/auth.validator';

const authRoute = express.Router();

authRoute.post('/login', validateSchema({ body: authSchema.login }), login);

export default authRoute;
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import swaggerUi from "swagger-ui-express";
import { config } from './config/config';
import { apiDocumentation } from './docs/apidoc';
import { errorHandlerMiddleware, invalidPathHandler, jsonSyntaxHandlerError } from './middlewares/error.middleware';
import apiRoutes from './routes';
import { jwtStrategy } from './utils/auth/strategies/jwt.strategy';

const app = express();

const corsOptions = {
    origin: config.clientUrl,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('combined'));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));

passport.use(jwtStrategy);
app.use(passport.initialize());

app.use('/api/v1', apiRoutes);

app.use(invalidPathHandler);
app.use(jsonSyntaxHandlerError);
app.use(errorHandlerMiddleware);

export default app;
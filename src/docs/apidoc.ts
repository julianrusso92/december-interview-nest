import { config } from '../config/config';
import { login, loginBody } from './auth';
// import { transactions } from './transactions';

const server = `http://localhost:${config.port}/api/`;

const apiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'REST API - Documentation',
        description: 'This is an exercise to december lab interview',
        contact: {
            name: 'Julián Russo',
            email: 'julianrusso92@gmail.com',
        },
    },
    servers: [
        {
            url: server,
            description: 'Local Server',
        },
        // {
        //     url: 'https://api.mysite.com',
        //     description: 'Production Server',
        // },
    ],
    tags: [
        {
            name: 'Transfer',
        },
        {
            name: 'Transactions',
        },
    ],
    paths: {
        '/v1/auth/login': {
            post: login,
        },
        '/v1/transfer': {
            // post: login,
        },
        '/v1/transactions': {
            // post: transactions,
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            loginBody,
            // updateUserBody,
            // createOrUpdateRoleBody,
        },
    },
};

export { apiDocumentation };
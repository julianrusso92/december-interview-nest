const userResponseWithRole = {
    _id: {
        type: 'string',
        example: '60564fcb544047cdc3844818',
    },
    fullName: {
        type: 'string',
        example: 'John Snow',
    },
    email: {
        type: 'string',
        example: 'john.snow@email.com',
    },
    password: {
        type: 'string',
        example: '442893aba778ab321dc151d9b1ad98c64ed56c07f8cbaed',
    },
    enabled: {
        type: 'boolean',
        example: true,
    },
    role: {
        type: 'object',
        properties: {
            _id: {
                type: 'string',
                example: '605636683f6e29c81c8b2db0',
            },
            name: {
                type: 'string',
                example: "Role's name",
            },
            description: {
                type: 'string',
                example: "Role's description",
            },
            createdAt: {
                type: 'string',
                example: '2021-03-19T09:51:01.506Z',
            },
            updatedAt: {
                type: 'string',
                example: '2021-03-19T11:48:25.980Z',
            },
        },
    },
    createdAt: {
        type: 'string',
        example: '2021-03-20T19:40:59.495Z',
    },
    updatedAt: {
        type: 'string',
        example: '2021-03-20T21:23:10.879Z',
    },
};

const internalServerError = {
    description: 'Internal Server Error',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Internal Server Error',
                    },
                },
            },
        },
    },
};

const userNotFound = {
    description: 'Resource not found',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'User with id: "71675fcb655047cdc4955929" not found',
                    },
                },
            },
        },
    },
};

const invalidUserData = {
    description: 'Invalid Data provided',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'The fields field1, field2 and field3 are required',
                    },
                },
            },
        },
    },
};

const security = [
    {
        bearerAuth: [],
    },
];

const loginBody = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            example: 'russoj92@gmail.com',
        },
        password: {
            type: 'string',
            description: "unencrypted user's password",
            example: 'Julian123$',
        },
    },
};

const updateUserBody = {
    type: 'object',
    properties: {
        fullName: {
            type: 'string',
            example: 'John Snow',
        },
        role: {
            type: 'string',
            example: '605636683f6e29c81c8b2db0',
        },
    },
};

const login = {
    tags: ['Auth'],
    description: 'Login in the aplication',
    operationId: 'login',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/loginBody',
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Login successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            token: {
                                type: 'string',
                            },
                        },
                    },
                },
            },
        },
        '422': invalidUserData,
        '500': internalServerError,
    },
};

export { login, loginBody, updateUserBody };
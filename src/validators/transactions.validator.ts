import Joi from "joi";

const transactionsSchema = {
    transactions: Joi.object().keys({
        from: Joi.date().iso(),
        to: Joi.date().iso(),
        sourceAccountID: Joi.string().uuid(),
        pageSize: Joi.number().integer().positive(),
        cursor: Joi.string().uuid(),
    })
};

export default transactionsSchema;

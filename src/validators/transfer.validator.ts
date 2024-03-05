import Joi from "joi";

const transferSchema = {
    transfer: Joi.object().keys({
        accountFrom: Joi.string().uuid().required(),
        accountTo: Joi.string().uuid().required(),
        amount: Joi.number().positive().required(),
        date: Joi.number().integer().positive().required(),
        description: Joi.string().max(500).required(),
    })
};

export default transferSchema;

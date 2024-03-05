import Joi from "joi";

const authSchema = {
    login: Joi.object().keys({
        username: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    })
};

export default authSchema;

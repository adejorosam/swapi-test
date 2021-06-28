import * as Joi from "@hapi/joi";

export const createCommentSchema = Joi.object().keys({
    body: Joi.string().required().min(2).max(500),
    movie: Joi.string().required(),
})
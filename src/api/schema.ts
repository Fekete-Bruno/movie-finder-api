import * as Joi from 'joi';
export const idSchema = Joi.string().pattern(new RegExp('tt[0-9]+'));

import Joi from 'joi';


export const signUpSchema = Joi.object({
  username: Joi.string().min(3).required().max(30).trim(),
  email: Joi.string().required().email({ minDomainSegments: 2 }).trim(),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    ),
  role: Joi.string().required().trim(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required().trim().email({ minDomainSegments: 2 }),
  password: Joi.string().required(),
});

export const categorySchema = Joi.object({
  name: Joi.string().required().trim(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().trim(),
});
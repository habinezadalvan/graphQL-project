import Joi from "joi";

export const productSchema = Joi.object({
  title: Joi.string().min(3).required().trim(),
  description: Joi.string().min(3).required().trim(),
  price: Joi.number().required(),
  number_of_sales: Joi.number(),
  is_featured: Joi.boolean(),
  categoryId: Joi.number().required(),
});

export const updateProductSchema = Joi.object({
  title: Joi.string().min(3).trim(),
  description: Joi.string().min(3).trim(),
  price: Joi.number(),
  number_of_sales: Joi.number(),
  is_featured: Joi.boolean(),
  categoryId: Joi.number().required(),
});


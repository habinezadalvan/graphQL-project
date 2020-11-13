import Joi from "joi";

export const productSchema = Joi.object({
  title: Joi.string().min(3).required().trim(),
  description: Joi.string().min(3).required().trim(),
  price: Joi.number().required(),
  image: Joi.string().required(),
  number_of_sales: Joi.number(),
  is_featured: Joi.boolean(),
  category: Joi.string().required().trim(),
});

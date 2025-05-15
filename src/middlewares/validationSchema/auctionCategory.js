const Joi = require("joi");

const auctionCategorySchema = Joi.object({
  name:Joi.string().required().min(2),
  description:Joi.string().allow("",null).optional(),
  icon:Joi.string().required()

});

module.exports = auctionCategorySchema;

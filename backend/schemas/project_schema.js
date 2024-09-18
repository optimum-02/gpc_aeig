const Joi = require("joi");
const commonSchema = require("./common");
const userSchema = require("./user_schema");

const projectSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().max(255).optional(),
  createdBy: userSchema.required(),
  collaborators: Joi.array().items(userSchema.optional()).default(),
  createdAt: Joi.date().required(),
  lastUpdatedAt: Joi.date().optional()
}).concat(commonSchema.mongooseIdSchema);

module.exports = projectSchema;

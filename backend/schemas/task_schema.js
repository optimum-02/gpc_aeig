const Joi = require("joi");
const commonSchema = require("./common");
const userSchema = require("./user_schema");

const taskSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().max(255).optional(),
  author: userSchema.required(),
  assignedTo: userSchema.optional(),
  status: Joi.string().valid('initial', 'inProgress', 'done').default('initial'),
  dueDate: Joi.date().optional(),
  priority: Joi.string().valid('Low', 'Medium', 'High').default('Low'),
  createdAt: Joi.date().required(),
  lastUpdatedAt: Joi.date().optional()
}).concat(commonSchema.mongooseIdSchema);

module.exports = taskSchema;

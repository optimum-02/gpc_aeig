const Joi = require("joi");
const commonSchema = require("./common");

const UserEntity = Joi.object({
  firstName: Joi.string().min(3).max(100).required(),
  lastName: Joi.string().min(3).max(100).required(),
  email: commonSchema.emailSchema,
  role: Joi.string().valid('admin', 'membre').required(),
}).concat(commonSchema.mongooseIdSchema);


const UserEntityWithPassword = Joi.object({
  firstName: Joi.string().min(3).max(100).required(),
  lastName: Joi.string().min(3).max(100).required(),
  email: commonSchema.emailSchema,
  role: Joi.string().valid('admin', 'membre').required(),
  password : Joi.string().min(8).required(),
}).concat(commonSchema.mongooseIdSchema);



module.exports = {UserEntity, UserEntityWithPassword};

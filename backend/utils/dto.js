const Joi = require("joi");
const { ValidationError } = require("./app_error");

function modelToEntityConverter(mongooseSchema, joiEntitySchema) {
  
  if (mongooseSchema &&  Joi.isSchema(joiEntitySchema)) {
    const { error, value } = joiEntitySchema.validate(mongooseSchema, {
      abortEarly: false, stripUnknown:true
    });
    if (error) {
      let validationError={};
           validationError.invalidData = error.details.map((err) =>
             err.message.replace(/"(\w+)"/g, "$$$1")
           );
      throw new ValidationError(validationError);
    }
    return value;
  }
}

module.exports = {modelToEntityConverter};

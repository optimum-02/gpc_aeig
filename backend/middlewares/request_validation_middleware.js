const Joi = require("joi");
const { ValidationError } = require("../utils/app_error");

const validateRequest = ({bodySchema, paramSchema, querySchema})=> {
  
  return (req, res, next) => {
      validationErrors ={};
      const validate = (schema, data, type) => {
      if (schema && Joi.isSchema(schema)) {
        const { error } = schema.validate(data, { abortEarly: false, stripUnknown:true });
        if (error) {
          const errorKey = `Invalid ${type}`;
           validationErrors[errorKey] = error.details.map((err) =>
             err.message.replace(/"(\w+)"/g, "$$$1")
           );
        }
      } 
    };
    validate(bodySchema, req.body, "Request body");
    validate(paramSchema, req.params, "Request path params");
    validate(querySchema, req.query, "Request query params");
    if (Object.keys(validationErrors).length > 0) {
       throw new ValidationError(validationErrors);
    }
    next();
  };
}

module.exports = {validateRequest};

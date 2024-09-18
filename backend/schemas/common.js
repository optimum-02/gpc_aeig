const Joi = require("joi");

// Schéma pour l'_id
const mongooseIdSchema = Joi.object({
  "_id" : Joi.string().hex().length(24)
  .required()
}).custom((value, helpers) => {
    // Remplacer `_id` par `id`
    const newValue = { id: value._id, ...value };
    delete newValue._id;
    return newValue;
  });

// Schéma pour l'email
const emailSchema = Joi.string().email().required();
const mongooseId = Joi.string().alphanum().length(24).required();

module.exports = {mongooseId, mongooseIdSchema, emailSchema};
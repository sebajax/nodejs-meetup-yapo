// module imports
import Joi from 'joi';

/**
 * domain validation
 */
const newCustomerSchema = Joi.object({
  // required fields
  name: Joi.string().min(1).max(100).required(),
  identityNumber: Joi.string().min(1).max(45).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).max(100).required(),
  phone: Joi.string().min(1).max(15).required(),
  address: Joi.string().min(3).required(),
});

export default newCustomerSchema;
export { newCustomerSchema };

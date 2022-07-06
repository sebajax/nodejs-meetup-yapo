// module imports
import statusCodes from 'http-status-codes';
// infraesctructure imports
import logger from '../infraestructure/log/logger';
// controller imports
import makeNewCustomerController from './newCustomer.controller';
// schema imports
import { newCustomerSchema } from '../schemas/customer.schema';
// service imports
import { newCustomerService } from '../services';

/* controller definitions */
const newCustomerController = makeNewCustomerController(
  newCustomerService,
  newCustomerSchema,
  statusCodes,
  logger,
);

export default newCustomerController;
export { newCustomerController };

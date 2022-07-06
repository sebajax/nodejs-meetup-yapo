// infraesctructure imports
import logger from '../infraestructure/log/logger';
// responses imports
import { newCustomerReponse } from '../responses/index';
// service imports
import makeNewCustomerService from './newCustomer.service';
// model imports
import { customerModel } from '../models';

/* service definitions */
const newCustomerService = makeNewCustomerService(
  customerModel,
  newCustomerReponse,
  logger,
);

export default newCustomerService;
export { newCustomerService };

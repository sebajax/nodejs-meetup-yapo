/**
 * @param {object} customerModel
 * @param {object} newCustomerReponse
 * @param {object} logger
 * @return {function}
 */
export default function makeNewCustomerService(
  customerModel,
  newCustomerReponse,
  logger,
) {
  /**
   * @param {object} customer
   * @return {object}
   */
  return async function newCustomerService(customer) {
    try {
      // validate identity
      const checkIdentity = await customerModel.checkIdentity(
        customer.identityNumber,
      );
      if (checkIdentity !== null) {
        return newCustomerReponse.INDENTITY_NUMBER_EXISTS;
      }

      // insert new customer into the database
      const createdCustomer = await customerModel.new(customer);
      if (createdCustomer === null) {
        return newCustomerReponse.NEW_CUSTOMER_SERVICE_DATABASE_ERROR;
      }

      // the customer was created successfully
      const { customerId } = createdCustomer;

      // return the created customer response
      return {
        ...newCustomerReponse.NEW_CUSTOMER_CREATED,
        data: {
          customerId,
        },
      };
    } catch (err) {
      logger.error(err);
      return newCustomerReponse.NEW_CUSTOMER_SERVICE_ERROR;
    }
  };
}

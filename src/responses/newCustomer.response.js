import statusCodes from 'http-status-codes';

/*
 * BAD_REQUEST
 */

const INDENTITY_NUMBER_EXISTS = {
  error: true,
  message: 'INDENTITY_NUMBER_EXISTS',
  code: statusCodes.BAD_REQUEST,
};

/*
 * INTERNAL_SERVER_ERROR
 */

const NEW_CUSTOMER_ERROR = {
  error: true,
  message: 'NEW_CUSTOMER_ERROR',
  code: statusCodes.INTERNAL_SERVER_ERROR,
};

/*
 * CREATED
 */

const NEW_CUSTOMER_CREATED = {
  error: false,
  message: 'NEW_CUSTOMER_CREATED',
  code: statusCodes.CREATED,
};

export default Object.freeze({
  INDENTITY_NUMBER_EXISTS,
  NEW_CUSTOMER_ERROR,
  NEW_CUSTOMER_CREATED,
});

export { INDENTITY_NUMBER_EXISTS, NEW_CUSTOMER_ERROR, NEW_CUSTOMER_CREATED };

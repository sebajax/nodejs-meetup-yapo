/**
 * @param {function} newCustomerService
 * @param {object} newCustomerSchema
 * @param {object} statusCodes
 * @param {object} logger
 * @return {function}
 */
export default function makeNewCustomerController(
  newCustomerService,
  newCustomerSchema,
  statusCodes,
  logger,
) {
  /**
   * @param {object} req
   * @param {object} res
   * @return {object}
   */
  return async function newCustomerController(req, res) {
    // destructuring req info
    const { body: customer } = req;

    // log end point execution
    logger.info(
      `${req.url} REQUEST ${JSON.stringify({
        type: 'request',
        customer,
        requestMethod: req.method,
        remoteIp: req.connection.remoteAddress,
      })}`,
    );

    try {
      const { error: errorRequest } = newCustomerSchema.validate(customer);

      if (errorRequest !== undefined) {
        logger.error(statusCodes.BAD_REQUEST, errorRequest.details[0].message);
        return res
          .status(statusCodes.BAD_REQUEST)
          .send({ error: true, message: errorRequest.details[0].message });
      }

      // call service
      const { error, message, code, data } = await newCustomerService(customer);

      logger.info(`${JSON.stringify({ code, message, data })}`);

      // return api response
      return res.status(code).send({ error, message, data });
    } catch (err) {
      logger.error(`SERVER_ERROR ${err}`);
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: true, message: 'SERVER_ERROR' });
    }
  };
}

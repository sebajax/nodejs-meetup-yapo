// module imports
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
// infraesctructure imports
import logger from '../../infraestructure/log/logger';

export default (req, res, next) => {
  if (Object.keys(req.body).length > 0) {
    return next();
  }
  logger.info(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
  return res
    .status(StatusCodes.BAD_REQUEST)
    .send({ error: true, message: ReasonPhrases.BAD_REQUEST });
};

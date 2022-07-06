// module imports
import crypto from 'crypto';

/**
 * @param {string} hmac
 * @param {string} hash
 * @return {bool}
 */
const verifyHmacUtil = (hmac, hash) => {
  const providedHmac = Buffer.from(hmac, 'utf-8');
  const generatedHmac = Buffer.from(hash, 'utf-8');

  let hashEquals = false;
  // timingSafeEqual will prevent any timing attacks. arguments must be buffers
  try {
    hashEquals = crypto.timingSafeEqual(generatedHmac, providedHmac);
  } catch (error) {
    hashEquals = false;
  }
  return hashEquals;
};

/**
 * @param {string} token
 * @param {object} body
 * @return {string}
 */
const createHmacUtil = (token, body) => {
  return crypto
    .createHmac('sha256', token)
    .update(body)
    .digest('base64')
    .trim();
};

const generateChecksumUtil = (str, algorithm, encoding) => {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex');
};

export default Object.freeze({
  verifyHmacUtil,
  createHmacUtil,
  generateChecksumUtil,
});

export { verifyHmacUtil, createHmacUtil, generateChecksumUtil };

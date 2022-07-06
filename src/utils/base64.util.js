/**
 * @param {string} data
 * @return {object}
 */
const decodeBase64Json = (data) => {
  return JSON.parse(Buffer.from(data, 'base64').toString());
};

/**
 * @param {string} data
 * @return {string}
 */
const encodeBase64Json = (data) => {
  return Buffer.from(JSON.stringify(data));
};

/**
 * @param {string} data
 * @return {string}
 */
const encodeBase64 = (data) => {
  return Buffer.from(data).toString('base64');
};

/**
 * @param {string} data
 * @return {string}
 */
const decodeBase64 = (data) => {
  return Buffer.from(data, 'base64').toString('ascii');
};

export { decodeBase64Json, encodeBase64Json, encodeBase64, decodeBase64 };

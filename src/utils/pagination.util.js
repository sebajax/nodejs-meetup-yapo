/**
 * @param {number} page
 * @param {number} size
 * @return {object}
 */
const getPagination = (page, size = process.env.UTIL_PAGINATION) => {
  const limit = parseInt(size, 10);
  const offset = (() => {
    if (page) {
      return page <= 0 ? 0 : (page - 1) * limit;
    }
    return 0;
  })();

  return { limit, offset };
};

/**
 * @param {number} count
 * @param {number} page
 * @param {number} limit
 * @return {object}
 */
const getPagingData = (count, page, limit) => {
  const currentPage = page <= 0 ? 1 : parseInt(page, 10);
  const totalPages = Math.ceil(count / limit);

  return { totalPages, currentPage };
};

export default Object.freeze({
  getPagination,
  getPagingData,
});

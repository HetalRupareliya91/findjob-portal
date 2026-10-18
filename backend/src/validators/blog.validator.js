const REQUIRED = ['title'];

/**
 * Validates a Blog Post payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateBlog(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.title !== undefined && typeof data.title !== 'string') errors.push('title must be text');
  if (data.content !== undefined && typeof data.content !== 'string') errors.push('content must be text');
  if (data.published !== undefined && typeof data.published !== 'boolean') errors.push('published must be true or false');
  return errors;
}

module.exports = { validateBlog };

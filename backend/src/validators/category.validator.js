const REQUIRED = ['name'];

/**
 * Validates a Category payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateCategory(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.name !== undefined && typeof data.name !== 'string') errors.push('name must be text');
  if (data.slug !== undefined && typeof data.slug !== 'string') errors.push('slug must be text');
  if (data.description !== undefined && typeof data.description !== 'string') errors.push('description must be text');
  return errors;
}

module.exports = { validateCategory };

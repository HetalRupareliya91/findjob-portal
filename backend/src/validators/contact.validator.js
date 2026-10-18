const REQUIRED = ['name'];

/**
 * Validates a Contact Request payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateContact(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.name !== undefined && typeof data.name !== 'string') errors.push('name must be text');
  if (data.email !== undefined && typeof data.email !== 'string') errors.push('email must be text');
  if (data.message !== undefined && typeof data.message !== 'string') errors.push('message must be text');
  return errors;
}

module.exports = { validateContact };

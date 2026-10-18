const REQUIRED = ['city'];

/**
 * Validates a Location payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateLocation(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.city !== undefined && typeof data.city !== 'string') errors.push('city must be text');
  if (data.state !== undefined && typeof data.state !== 'string') errors.push('state must be text');
  if (data.country !== undefined && typeof data.country !== 'string') errors.push('country must be text');
  return errors;
}

module.exports = { validateLocation };

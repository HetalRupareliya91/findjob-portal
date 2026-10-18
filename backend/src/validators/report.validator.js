const REQUIRED = ['reason'];

/**
 * Validates a Report payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateReport(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.reason !== undefined && typeof data.reason !== 'string') errors.push('reason must be text');
  if (data.status !== undefined && typeof data.status !== 'string') errors.push('status must be text');
  return errors;
}

module.exports = { validateReport };

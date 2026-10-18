const REQUIRED = ['subject'];

/**
 * Validates a Message payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateMessage(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.subject !== undefined && typeof data.subject !== 'string') errors.push('subject must be text');
  if (data.body !== undefined && typeof data.body !== 'string') errors.push('body must be text');
  if (data.read !== undefined && typeof data.read !== 'boolean') errors.push('read must be true or false');
  return errors;
}

module.exports = { validateMessage };

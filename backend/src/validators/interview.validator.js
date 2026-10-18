const REQUIRED = ['scheduledAt'];

/**
 * Validates a Interview payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateInterview(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.scheduledAt !== undefined && data.scheduledAt !== '' && isNaN(Date.parse(data.scheduledAt))) errors.push('scheduledAt must be a valid date');
  if (data.mode !== undefined && typeof data.mode !== 'string') errors.push('mode must be text');
  if (data.notes !== undefined && typeof data.notes !== 'string') errors.push('notes must be text');
  return errors;
}

module.exports = { validateInterview };

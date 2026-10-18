const REQUIRED = ['jobId'];

/**
 * Validates a Saved Job payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateSavedJob(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.jobId !== undefined && typeof data.jobId !== 'string') errors.push('jobId must be text');
  if (data.note !== undefined && typeof data.note !== 'string') errors.push('note must be text');
  return errors;
}

module.exports = { validateSavedJob };

const REQUIRED = ['question'];

/**
 * Validates a FAQ payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateFaq(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.question !== undefined && typeof data.question !== 'string') errors.push('question must be text');
  if (data.answer !== undefined && typeof data.answer !== 'string') errors.push('answer must be text');
  return errors;
}

module.exports = { validateFaq };

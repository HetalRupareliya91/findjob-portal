const REQUIRED = ['institute'];

/**
 * Validates a Education payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateEducation(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.institute !== undefined && typeof data.institute !== 'string') errors.push('institute must be text');
  if (data.degree !== undefined && typeof data.degree !== 'string') errors.push('degree must be text');
  if (data.passingYear !== undefined && data.passingYear !== '' && isNaN(Number(data.passingYear))) errors.push('passingYear must be a number');
  return errors;
}

module.exports = { validateEducation };

const REQUIRED = ['coverLetter'];

/**
 * Validates a Application payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateApplication(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.coverLetter !== undefined && typeof data.coverLetter !== 'string') errors.push('coverLetter must be text');
  if (data.status !== undefined && typeof data.status !== 'string') errors.push('status must be text');
  if (data.expectedSalary !== undefined && data.expectedSalary !== '' && isNaN(Number(data.expectedSalary))) errors.push('expectedSalary must be a number');
  return errors;
}

module.exports = { validateApplication };

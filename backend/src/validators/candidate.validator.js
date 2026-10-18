const REQUIRED = ['fullName'];

/**
 * Validates a Candidate payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateCandidate(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.fullName !== undefined && typeof data.fullName !== 'string') errors.push('fullName must be text');
  if (data.headline !== undefined && typeof data.headline !== 'string') errors.push('headline must be text');
  if (data.experienceYears !== undefined && data.experienceYears !== '' && isNaN(Number(data.experienceYears))) errors.push('experienceYears must be a number');
  return errors;
}

module.exports = { validateCandidate };

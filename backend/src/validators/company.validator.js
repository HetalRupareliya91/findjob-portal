const REQUIRED = ['name'];

/**
 * Validates a Company payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateCompany(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.name !== undefined && typeof data.name !== 'string') errors.push('name must be text');
  if (data.website !== undefined && typeof data.website !== 'string') errors.push('website must be text');
  if (data.industry !== undefined && typeof data.industry !== 'string') errors.push('industry must be text');
  if (data.size !== undefined && data.size !== '' && isNaN(Number(data.size))) errors.push('size must be a number');
  return errors;
}

module.exports = { validateCompany };

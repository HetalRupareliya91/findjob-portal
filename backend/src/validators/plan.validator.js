const REQUIRED = ['name'];

/**
 * Validates a Subscription Plan payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validatePlan(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.name !== undefined && typeof data.name !== 'string') errors.push('name must be text');
  if (data.price !== undefined && data.price !== '' && isNaN(Number(data.price))) errors.push('price must be a number');
  if (data.durationDays !== undefined && data.durationDays !== '' && isNaN(Number(data.durationDays))) errors.push('durationDays must be a number');
  return errors;
}

module.exports = { validatePlan };

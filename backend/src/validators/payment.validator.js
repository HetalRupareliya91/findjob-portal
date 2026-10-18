const REQUIRED = ['amount'];

/**
 * Validates a Payment payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validatePayment(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.amount !== undefined && data.amount !== '' && isNaN(Number(data.amount))) errors.push('amount must be a number');
  if (data.currency !== undefined && typeof data.currency !== 'string') errors.push('currency must be text');
  if (data.status !== undefined && typeof data.status !== 'string') errors.push('status must be text');
  return errors;
}

module.exports = { validatePayment };

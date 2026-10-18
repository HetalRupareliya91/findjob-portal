const REQUIRED = ['title'];

/**
 * Validates a Job payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateJob(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.title !== undefined && typeof data.title !== 'string') errors.push('title must be text');
  if (data.description !== undefined && typeof data.description !== 'string') errors.push('description must be text');
  if (data.salary !== undefined && data.salary !== '' && isNaN(Number(data.salary))) errors.push('salary must be a number');
  if (data.jobType !== undefined && typeof data.jobType !== 'string') errors.push('jobType must be text');
  return errors;
}

module.exports = { validateJob };

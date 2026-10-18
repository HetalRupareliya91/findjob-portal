const REQUIRED = ['title'];

/**
 * Validates a Resume payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateResume(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.title !== undefined && typeof data.title !== 'string') errors.push('title must be text');
  if (data.fileUrl !== undefined && typeof data.fileUrl !== 'string') errors.push('fileUrl must be text');
  if (data.summary !== undefined && typeof data.summary !== 'string') errors.push('summary must be text');
  return errors;
}

module.exports = { validateResume };

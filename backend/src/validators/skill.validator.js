const REQUIRED = ['name'];

/**
 * Validates a Skill payload.
 * @param {object} data request body
 * @param {{ partial?: boolean }} options partial=true skips required checks (updates)
 * @returns {string[]} list of validation errors
 */
function validateSkill(data, { partial = false } = {}) {
  const errors = [];
  if (!data || typeof data !== 'object') return ['Request body must be an object'];
  if (!partial) {
    REQUIRED.forEach((field) => {
      if (data[field] === undefined || data[field] === '') errors.push(field + ' is required');
    });
  }
  if (data.name !== undefined && typeof data.name !== 'string') errors.push('name must be text');
  if (data.level !== undefined && typeof data.level !== 'string') errors.push('level must be text');
  return errors;
}

module.exports = { validateSkill };

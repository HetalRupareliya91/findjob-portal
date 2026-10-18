const { validatePlan } = require('../src/validators/plan.validator');

describe('Subscription Plan validator', () => {
  it('requires name', () => {
    expect(validatePlan({})).toContain('name is required');
  });

  it('accepts a valid payload', () => {
    expect(validatePlan({ name: 'Sample name', price: 10, durationDays: 10 })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validatePlan({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validatePlan(null).length).toBe(1);
  });
});

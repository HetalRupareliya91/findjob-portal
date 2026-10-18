const { validateBenefit } = require('../src/validators/benefit.validator');

describe('Benefit validator', () => {
  it('requires title', () => {
    expect(validateBenefit({})).toContain('title is required');
  });

  it('accepts a valid payload', () => {
    expect(validateBenefit({ title: 'Sample title', description: 'Sample description' })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateBenefit({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateBenefit(null).length).toBe(1);
  });
});

const { validateCompany } = require('../src/validators/company.validator');

describe('Company validator', () => {
  it('requires name', () => {
    expect(validateCompany({})).toContain('name is required');
  });

  it('accepts a valid payload', () => {
    expect(validateCompany({ name: 'Sample name', website: 'Sample website', industry: 'Sample industry', size: 10 })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateCompany({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateCompany(null).length).toBe(1);
  });
});

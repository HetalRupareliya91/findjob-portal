const { validateLocation } = require('../src/validators/location.validator');

describe('Location validator', () => {
  it('requires city', () => {
    expect(validateLocation({})).toContain('city is required');
  });

  it('accepts a valid payload', () => {
    expect(validateLocation({ city: 'Sample city', state: 'Sample state', country: 'Sample country' })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateLocation({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateLocation(null).length).toBe(1);
  });
});

const { validatePayment } = require('../src/validators/payment.validator');

describe('Payment validator', () => {
  it('requires amount', () => {
    expect(validatePayment({})).toContain('amount is required');
  });

  it('accepts a valid payload', () => {
    expect(validatePayment({ amount: 10, currency: 'Sample currency', status: 'Sample status' })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validatePayment({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validatePayment(null).length).toBe(1);
  });
});

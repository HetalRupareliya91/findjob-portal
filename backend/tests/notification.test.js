const { validateNotification } = require('../src/validators/notification.validator');

describe('Notification validator', () => {
  it('requires title', () => {
    expect(validateNotification({})).toContain('title is required');
  });

  it('accepts a valid payload', () => {
    expect(validateNotification({ title: 'Sample title', body: 'Sample body', read: true })).toEqual([]);
  });

  it('allows partial updates', () => {
    expect(validateNotification({}, { partial: true })).toEqual([]);
  });

  it('rejects a non-object body', () => {
    expect(validateNotification(null).length).toBe(1);
  });
});

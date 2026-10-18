import client from './client';

const base = '/reviews';

export const reviewApi = {
  list: (params) => client.get(base, { params }).then((r) => r.data.data),
  get: (id) => client.get(base + '/' + id).then((r) => r.data.data),
  create: (payload) => client.post(base, payload).then((r) => r.data.data),
  update: (id, payload) => client.put(base + '/' + id, payload).then((r) => r.data.data),
  remove: (id) => client.delete(base + '/' + id).then((r) => r.data),
};

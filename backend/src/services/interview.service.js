const Interview = require('../models/Interview.model');

const escapeRegex = (text) => String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function list(query = {}) {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 10, 1), 100);
  const filter = {};
  // scheduledAt is not a text field, so free-text search is not applied

  const [items, total] = await Promise.all([
    Interview.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Interview.countDocuments(filter),
  ]);

  return { items, total, page, pages: Math.ceil(total / limit) || 1 };
}

const getById = (id) => Interview.findById(id);

const create = (data, userId) => Interview.create({ ...data, createdBy: userId });

function update(id, data) {
  const { _id, createdAt, updatedAt, __v, createdBy, ...changes } = data;
  return Interview.findByIdAndUpdate(id, changes, { new: true, runValidators: true });
}

const remove = (id) => Interview.findByIdAndDelete(id);

module.exports = { list, getById, create, update, remove };

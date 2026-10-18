const Application = require('../models/Application.model');

const escapeRegex = (text) => String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function list(query = {}) {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 10, 1), 100);
  const filter = {};
  if (query.search) filter.coverLetter = { $regex: escapeRegex(query.search), $options: 'i' };

  const [items, total] = await Promise.all([
    Application.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Application.countDocuments(filter),
  ]);

  return { items, total, page, pages: Math.ceil(total / limit) || 1 };
}

const getById = (id) => Application.findById(id);

const create = (data, userId) => Application.create({ ...data, createdBy: userId });

function update(id, data) {
  const { _id, createdAt, updatedAt, __v, createdBy, ...changes } = data;
  return Application.findByIdAndUpdate(id, changes, { new: true, runValidators: true });
}

const remove = (id) => Application.findByIdAndDelete(id);

module.exports = { list, getById, create, update, remove };

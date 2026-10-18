const service = require('../services/blog.service');
const { validateBlog } = require('../validators/blog.validator');

exports.list = async (req, res, next) => {
  try {
    res.json({ success: true, data: await service.list(req.query) });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const item = await service.getById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Blog Post not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const errors = validateBlog(req.body);
    if (errors.length) return res.status(400).json({ success: false, errors });
    const item = await service.create(req.body, req.user && req.user.id);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const errors = validateBlog(req.body, { partial: true });
    if (errors.length) return res.status(400).json({ success: false, errors });
    const item = await service.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ success: false, message: 'Blog Post not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await service.remove(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Blog Post not found' });
    res.json({ success: true, message: 'Blog Post deleted' });
  } catch (err) {
    next(err);
  }
};

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { protect } = require('../middleware/auth');

const sign = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });

const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, role: user.role });

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'name, email and password are required' });
    }
    const safeRole = role === 'employer' ? 'employer' : 'candidate';
    const user = await User.create({ name, email, password, role: safeRole });
    res.status(201).json({ success: true, data: { token: sign(user), user: publicUser(user) } });
  } catch (err) {
    if (err.code === 11000) {
      err.status = 409;
      err.message = 'Email already registered';
    }
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: String(email || '').toLowerCase() }).select('+password');
    if (!user || !(await user.matchPassword(password || ''))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    res.json({ success: true, data: { token: sign(user), user: publicUser(user) } });
  } catch (err) {
    next(err);
  }
});

router.get('/me', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: publicUser(user) });
  } catch (err) {
    next(err);
  }
});

module.exports = { path: '/api/auth', router };

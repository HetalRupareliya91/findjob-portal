const router = require('express').Router();
const controller = require('../controllers/jobAlert.controller');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.post('/', protect, controller.create);
router.put('/:id', protect, controller.update);
router.delete('/:id', protect, adminOnly, controller.remove);

module.exports = { path: '/api/job-alerts', router };

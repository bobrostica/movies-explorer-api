const router = require('express').Router();

const { getCurrentUser, updateUser } = require('../controllers/users');

const { updateUserValidator } = require('../validators/users');

router.get('/me', getCurrentUser);
router.patch('/me', updateUserValidator, updateUser);

module.exports = router;

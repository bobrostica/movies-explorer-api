const router = require('express').Router();

const auth = require('../middlewares/auth');
const users = require('./users');
const movies = require('./movies');
const { registerUser, loginUser, logOutUser } = require('../controllers/users');

const {
  registerUserValidator,
  loginUserValidator,
} = require('../validators/users');

router.post('/signup', registerUserValidator, registerUser);
router.post('/signin', loginUserValidator, loginUser);

router.post('/signout', auth, logOutUser);
router.use('/users', auth, users);
router.use('/movies', auth, movies);

module.exports = router;

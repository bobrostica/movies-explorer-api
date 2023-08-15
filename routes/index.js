const router = require('express').Router();

const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const notFoundHandler = require('../middlewares/notFoundHandler');
const { registerUser, loginUser, logOutUser } = require('../controllers/users');

const {
  registerUserValidator,
  loginUserValidator,
} = require('../validators/users');

router.post('/signup', registerUserValidator, registerUser);
router.post('/signin', loginUserValidator, loginUser);

router.post('/signout', auth, logOutUser);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('*', notFoundHandler);

module.exports = router;

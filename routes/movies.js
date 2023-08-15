const router = require('express').Router();

const {
  getUserMovies,
  saveMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  saveMovieValidator,
  movieIdValidator,
} = require('../validators/movies');

router.get('/', getUserMovies);
router.post('/', saveMovieValidator, saveMovie);
router.delete('/:id', movieIdValidator, deleteMovie);

module.exports = router;

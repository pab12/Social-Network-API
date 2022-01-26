const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  updateThought,
  addThought,
  deleteThought
} = require('../../controllers/thoughts-controller');

router.route('/:UserId').post(addThought);

router.route('/').get(getAllThought);

router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

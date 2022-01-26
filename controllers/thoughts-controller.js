const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts

  getAllThought(req,res) {
    Thought.find({})
    .populate({
      path: 'reactions',
      select: '-__v'
    })
    .select('-__v')
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },

  // get one thought by its id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .populate({
      path:'reactions',
      select: '-__v'
    })
    .select('-__v')
    .then(dbThoughtData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    })
  },

  addThought({ params, body }, res) {
    Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then(dbUserData => {
      console.log(dbUserData);
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },

  // update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'no thoughts found with this id!' });
        }
      })
  },
  // delete a thought by it's id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
  }
};

module.exports = thoughtController;
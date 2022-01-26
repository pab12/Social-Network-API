const { Schema, model } = require('mongoose');
//const dateFormat =
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Must have text between 1 and 280 characters',
      validate: {
        minlength: 1,
        maxlength: 280
      },
      createdAt: {
        type: Date,
        default: Date.now,
  //      get: (createdAtVal) => dateFormat(createdAtVal)
      },
      username: {
        type: String,
        required: 'User has to exist to have a thought',
        reactions: [

        ]
      }
    }
  }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.thought.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
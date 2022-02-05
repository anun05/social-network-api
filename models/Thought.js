const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      minLength: 1,
      maxLength: 280,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: {
      posts: [
        {
          type: Schema.Types.ObjectId,
          ref: "reaction",
        },
      ],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
thoughtSchema

  // create virtual
  .virtual("reactionCount")
  .get(function () {
    return this.reactions.posts.length;
  });

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    //default: Thought.id
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// initialize Thought model.
const Thought = model("thought", thoughtSchema);
const Reaction = model("reaction", reactionSchema);
module.exports = Reaction;
module.exports = Thought;

const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const moment = require("moment");
const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (time) => moment(time).format("MMM DD YYYY [at] hh:mm a"),
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

reactionSchema.eachPath(function (path) {
  console.log(path);
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
// Model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;

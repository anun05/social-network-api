const { User, Thought, Reaction } = require("../models");

module.exports = {
  createThought(req, res) {
    console.log(req.body);
    Thought.create(req.body)
      .then((thought) => {
        console.log(thought);
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thought._id } },
          { new: true }
        ).then((userdata) => {
          res.json(userdata);
        });
      })
      .catch((err) => res.status(500).json(err));
  },
  getThoughts(req, res) {
    Thought.find()
      // .sort({ createdAt: -1 })
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((oneThought) => {
        // if statement produces an unhandledpromise rejection warning
        if (!oneThought) {
          res.json({
            message: `No thought with that id exists. Please try again with another id`,
          });
        }
        res.json(oneThought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // updates thought but mus inlcude the thoughtText, username, and userId in the body
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((updatedThought) => res.json(updatedThought))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          res.status(404).json({ message: `no user with this id found` });
        }
        res.json({ meassage: `deleted` });
      })
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((newreaction) => {
        console.log(`${newreaction} newreaction`);

        res.json(newreaction);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

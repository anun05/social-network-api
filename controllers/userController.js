const { User, Thought, Reaction } = require("../models");

module.exports = {
  // gets users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //   creates user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //   gets one user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId }).then(async (user) => {
      !user
        ? res.status(404).json({ message: "No user with that id" })
        : res.json({
            user,
            // needs friend data too
          });
    });
  },
  //   deletes user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that id" });
        }

        res.json({ message: `user deleted` });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((course) =>
        !course
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
  createFriend(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      {
        $addToSet: { friends: req.params.friendId },
      },
      { new: true }
    ).then((newFriend) => {
      if (!newFriend) {
        res.status(404).json({ message: `no user with this id found` });
      }
      res.json(newFriend);
    });
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      {
        _id: req.params.userId,
      },
      {
        $pull: { friends: req.params.friendId },
      },
      { runValidators: true, new: true }
    )
      .then((friend) => {
        if (!friend) {
          res.status(404).json({ message: `no user with this id found` });
        }
        res.json({ message: `friend has been removed` });
      })
      .catch((err) => res.status(500).json(err));
  },
};

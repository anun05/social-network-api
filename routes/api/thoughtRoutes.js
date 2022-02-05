const router = require("express").Router();

const {
  getThought,
  getSingleThought,
  createThought,
  deleteThought,
  getReactions,
  createReactions,
  deleteReaction,
} = require("../../controllers/thoughtsController");

// /api/thoughts
router.route("/").get(getThought).post(createThought);

// api/thoughts/
router.route("/").get(getThought).delete(deleteThought);

// /api/thoughts/:userId
router.route("/:userThought").get(getSingleThought).delete(deleteThought);

// // api/reactions/
//   router.route('/').get(getReactions).post(createReactions);

//  router.route('/').get(getReactions).delete(deleteReaction);

module.exports = router;

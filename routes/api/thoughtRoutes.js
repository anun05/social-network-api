const router = require("express").Router();

// brings in methods from controller file
const {
  createThought,
  getThoughts,
  getSingleThought,
  deleteThought,
  updateThought,
  addReaction,
  // removeReaction

  // this is where the methods go from the controllers file
} = require("../../controllers/thoughtController");

//   Routes

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);

// reaction post method is faulty/ no reaction made
router.route("/:thoughtId/reactions").post(addReaction);
// .delete(removeReaction);

module.exports = router;

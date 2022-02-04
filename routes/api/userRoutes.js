const router = require("express").Router();

const {
  getUsers,
  createUser,
  getSingleUser,
  deleteUser,
  updateUser,
  createFriend,
  deleteFriend,

  // this is where the methods go from the controllers file
} = require("../../controllers/userController");

// /api/users
// for getting all users and creating a user
router.route("/").get(getUsers).post(createUser);

//For getting a single user and delete  /api/users/:userId
router.route("/:userId").get(getSingleUser).delete(deleteUser);

//For update /api/users/:userId
router.route("/:userId").put(updateUser);
// creates a friend
router
  .route("/:userId/friends/:friendId")
  .post(createFriend)
  .delete(deleteFriend);

module.exports = router;

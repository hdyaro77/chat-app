const express = require("express");
const userControls = require("../Controllers/userController");
const app = require("../server");
const router = express.Router();

router.post("/signup", userControls.signUp);
router.post("/login", userControls.signIn);
router.route("/").get(userControls.getUsers).post(userControls.getFriends);
// router.route("/:query").;
router.route("/addFriend").post(userControls.addFriend);
module.exports = router;

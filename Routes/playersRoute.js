const express = require("express");
const playerController = require("../Controllers/playersController");
const router = express.Router();


// router.route("/updateThisUser").post(userController.updateThisUser);
router.route("/filter").post(playerController.Filter)
module.exports = router;
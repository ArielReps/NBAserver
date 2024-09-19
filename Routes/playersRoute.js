const express = require("express");
const playerController = require("../Controllers/playersController");
const router = express.Router();


// router.route("/updateThisUser").post(userController.updateThisUser);
router.route("/filter").post(playerController.Filter)
router.route("/AddTeam").post(playerController.AddTeam)
router.route("/GetTeamById/:id").get(playerController.GetTeamById)
router.route("/GetAllTeams").get(playerController.GetAllTeams)
module.exports = router;
const express = require("express");
const { userProfileController } = require("../controller/user.controller");
const { Authentication } = require("../middleware/auth.middleware");
const userRoutes = express.Router();

userRoutes.route("/profile").get(Authentication, userProfileController);
module.exports = userRoutes;

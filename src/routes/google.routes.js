const express = require("express");
const GoogleRoutes = express.Router();
const GoogleAuthControllerClass = require("../controller/google.controller");

const googleAuthController = new GoogleAuthControllerClass();

GoogleRoutes.get("/", googleAuthController.googleAuth);
GoogleRoutes.get("/callback", googleAuthController.googleAuthCallback);

module.exports = GoogleRoutes;

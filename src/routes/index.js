const express = require("express");
const GoogleRoutes = require("./google.routes");
const GithubRoutes = require("./github.routes");
const userRoutes = require("./user.routes");
const calendarRoutes = require("./calendar.routes");
const IndexRoutes = express.Router();
const AuthRoutes = express.Router();

// -------------------------------------------
// AUTH ROUTES
// -------------------------------------------
AuthRoutes.use("/google", GoogleRoutes);
AuthRoutes.use("/github", GithubRoutes);

// -------------------------------------------
// INDEX ROUTES
// -------------------------------------------
IndexRoutes.use("/user", userRoutes);
IndexRoutes.use("/calendar", calendarRoutes);

module.exports = {
  AuthRoutes,
  IndexRoutes,
};

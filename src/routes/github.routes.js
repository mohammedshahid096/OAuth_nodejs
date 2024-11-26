const express = require("express");
const GithubRoutes = express.Router();
const GithubAuthControllerClass = require("../controller/github.controller");

const githubAuthController = new GithubAuthControllerClass();

GithubRoutes.get("/", githubAuthController.githubAuth);
GithubRoutes.get("/callback", githubAuthController.githubAuthCallback);

module.exports = GithubRoutes;

const { FRONTEND_BASE_URL, GITHUB_SCOPE } = require("../config/index");
const passportConfig = require("../config/password.config");
const httpErrors = require("http-errors");
const { createAccessToken } = require("../utils/jwt.token");

class GithubAuthControllerClass {
  constructor() {}

  githubAuth = (req, res, next) => {
    try {
      passportConfig.authenticate("github", {
        scope: GITHUB_SCOPE,
        accessType: "offline",
        prompt: "consent",
      })(req, res, next);
    } catch (error) {
      return next(httpErrors.InternalServerError(error));
    }
  };

  githubAuthCallback = async (req, res, next) => {
    passportConfig.authenticate("github", {
      failureRedirect: "/error",
      //   session: true
    })(req, res, async function (err) {
      if (err) {
        return next(httpErrors.InternalServerError(err));
      }

      // User data will be available in req.user
      const userData = req.user;
      const accessToken = await createAccessToken(req.user._id);
      const frontendUrl = `${FRONTEND_BASE_URL}/user/oAuth?accessToken=${accessToken}&&userId=${userData._id}`;
      res.redirect(frontendUrl);
    });
  };
}

module.exports = GithubAuthControllerClass;

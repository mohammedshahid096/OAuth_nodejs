const { GOOGLE_SCOPE, FRONTEND_BASE_URL } = require("../config/index");
const passportConfig = require("../config/password.config");
const httpErrors = require("http-errors");
const { createAccessToken } = require("../utils/jwt.token");

class GoogleAuthControllerClass {
  constructor() {}

  googleAuth = (req, res, next) => {
    try {
      passportConfig.authenticate("google", {
        scope: GOOGLE_SCOPE,
        accessType: "offline",
        prompt: "consent",
      })(req, res, next);
    } catch (error) {
      return next(httpErrors.InternalServerError(error));
    }
  };

  googleAuthCallback = async (req, res, next) => {
    passportConfig.authenticate("google", {
      failureRedirect: "/error",
      //   session: true
    })(req, res, async function (err) {
      if (err) {
        return next(httpErrors.InternalServerError(err));
      }

      // User data will be available in req.user
      const userData = req.user;
      const accessToken = await createAccessToken(req.user._id);
      console.log("googleAccessToken :", accessToken);
      const frontendUrl = `${FRONTEND_BASE_URL}/user/oAuth?accessToken=${accessToken}&&userId=${userData._id}`;
      res.redirect(frontendUrl);
    });
  };
}

module.exports = GoogleAuthControllerClass;

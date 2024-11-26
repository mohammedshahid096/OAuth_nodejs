const userModel = require("../models/user.model");
const httpErrors = require("http-errors");
const { AUTHENTICATION_TOKEN_REQUIRED } = require("../constant/auth.constant");
const { verifyAccessToken } = require("../utils/jwt.token");

module.exports.Authentication = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(httpErrors.Unauthorized(AUTHENTICATION_TOKEN_REQUIRED));
    }

    const token = authHeader.split(" ")[1];

    const decode = await verifyAccessToken(token);

    if (!decode.success) {
      return next(httpErrors.Unauthorized(decode.error.message));
    }

    let userExist = await userModel.findById(decode.id).lean();

    if (!userExist) {
      return next(httpErrors.NotFound(USER_NOT_FOUND));
    }
    req.user = userExist;
    console.log(`req Email : ${userExist.email}`);
    next();
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

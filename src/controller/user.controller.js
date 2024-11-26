const httpErrors = require("http-errors");

const userProfileController = async (req, res, next) => {
  try {
    let userDetails = req.user;
    if (userDetails?.googleId) {
      delete userDetails.googleId;
      delete userDetails.googleToken;
    }
    res.status(200).json({
      success: true,
      data: userDetails,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports = {
  userProfileController,
};

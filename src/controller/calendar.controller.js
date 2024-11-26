const httpErrors = require("http-errors");
const CalendarServiceClass = require("../services/calendar.service");

const fetchCalendarsController = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.user.googleToken;
    const calendarService = new CalendarServiceClass(accessToken, refreshToken);
    const data = await calendarService.calendarsList();
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports = {
  fetchCalendarsController,
};

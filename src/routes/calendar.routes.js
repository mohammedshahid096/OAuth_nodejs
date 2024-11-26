const express = require("express");
const { Authentication } = require("../middleware/auth.middleware");
const {
  fetchCalendarsController,
} = require("../controller/calendar.controller");

const calendarRoutes = express.Router();

calendarRoutes
  .route("/calendars")
  .get(Authentication, fetchCalendarsController);
// router.get('/calendars/:calendarId/events', );

module.exports = calendarRoutes;

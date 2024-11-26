const express = require("express");
const app = express();
const { SESSION_SECRET_KEY } = require("./src/config");
const connectToDB = require("./src/config/mongodb.config");
const session = require("express-session");
const passport = require("./src/config/password.config");
const { IndexRoutes, AuthRoutes } = require("./src/routes");

connectToDB();

app.use(
  session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", AuthRoutes);
app.use("/api/v1", IndexRoutes);

// if routes not found
app.use("*", (req, res) => {
  res.status(500).json({
    success: false,
    statusCode: 500,
    url: req.baseUrl,
    type: req.method,
    message: "API not found",
  });
});

// response for error message
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    statusCode: err.status || 500,
    message: err.message || "internal server error",
    stack: err.stack || "not present",
  });
});

module.exports = app;

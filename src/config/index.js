require("dotenv").config();

const googleScopes = [
  "email",
  "profile",
  // "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar",

  // "https://www.googleapis.com/auth/calendar.events.freebusy",
  // "https://www.googleapis.com/auth/gmail.readonly",
];

const githubScopes = ["user:email", "read:user"];

module.exports = {
  // port
  PORT: process.env.PORT || 8001,

  // databases
  DB_URL: process.env.DB_URL,
  DB_URL_DEV: process.env.DB_URL_DEV,

  // jwt tokens
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY || "access_token_key",
  ACCESS_TOKEN_KEY_TIME: process.env.ACCESS_TOKEN_KEY_TIME || "2D",

  // # google console
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID",
  GOOGLE_CLIENT_SECRET:
    process.env.GOOGLE_CLIENT_SECRET || "YOUR_GOOGLE_SECRET_KEY",
  GOOGLE_CALLBACK_URL:
    process.env.GOOGLE_CALLBACK_URL ||
    "http://localhost:8001/auth/google/callback",
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY || "testsecret",
  GOOGLE_SCOPE: googleScopes,

  // # github developer settings
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || "YOUR_GITHUB_CLIENT_ID",
  GITHUB_CLIENT_SECRET:
    process.env.GITHUB_CLIENT_SECRET || "YOUR_GITHUB_SECRET_KEY",
  GITHUB_CALLBACK_URL:
    process.env.GITHUB_CALLBACK_URL ||
    "http://localhost:8000/auth/github/callback",
  GITHUB_SCOPE: githubScopes,

  FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL || "http://localhost:3000",
};

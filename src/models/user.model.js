const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    googleDetails: {
      googleId: String,
      email: String,
      displayName: String,
      firstName: String,
      lastName: String,
      profilePhoto: String,
      isEmailVerified: Boolean,
      token: {
        accessToken: String,
        refreshToken: String,
        tokenExpiry: Date,
      },
    },

    githubDetails: {
      githubId: String,
      username: String,
      displayName: String,
      profilePhoto: String,
      profileUrl: String,
      token: {
        accessToken: String,
        tokenExpiry: Date,
      },
    },

    providers: {
      google: {
        type: Boolean,
        default: false,
      },
      github: {
        type: Boolean,
        default: false,
      },
    },
    lastLogin: Date,
  },
  { timestamps: true }
);

ModelSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const userModel = mongoose.model("user", ModelSchema);

module.exports = userModel;

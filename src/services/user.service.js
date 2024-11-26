const userModel = require("../models/user.model");

class UserServiceClass {
  constructor() {}

  findOrCreateGoogleUser = async (googleProfile, accessToken, refreshToken) => {
    try {
      let user = await userModel.findOne({ googleId: googleProfile.id });

      const token = {
        accessToken,
        refreshToken,
        tokenExpiry: new Date(Date.now() + 3600000), // 1 hour from now
        //   scope: googleProfile.scope || []
      };

      if (!user) {
        const newDetails = {
          googleId: googleProfile.id,
          email: googleProfile.emails[0].value,
          googleDetails: {
            googleId: googleProfile.id,
            email: googleProfile.emails[0].value,
            displayName: googleProfile.displayName,
            firstName: googleProfile.name?.givenName,
            lastName: googleProfile.name?.familyName,
            profilePhoto: googleProfile.photos?.[0]?.value,
            isEmailVerified: googleProfile.emails?.[0]?.verified || false,
            token,
          },
          providers: {
            google: true,
          },
        };
        user = await userModel.create(newDetails);
      } else {
        // Update existing user
        user.googleDetails.lastLogin = new Date();
        user.googleDetails.token = token;
        await user.save();
      }

      return user;
    } catch (error) {
      console.error("Error in findOrCreateGoogleUser:", error);
      throw error;
    }
  };

  findOrCreateGithubUser = async (githubProfile, accessToken) => {
    try {
      let user = await userModel.findOne({ githubId: githubProfile.id });

      const token = {
        accessToken,
        tokenExpiry: new Date(Date.now() + 3600000), // 1 hour from now
      };

      if (!user) {
        const newUser = {
          githubId: githubProfile.id,
          githubDetails: {
            githubId: githubProfile.id,
            displayName: githubProfile.displayName,
            username: githubProfile.username,
            profilePhoto: githubProfile.photos?.[0]?.value,
            profileUrl: githubProfile.profileUrl,
            token,
          },
          providers: {
            github: true,
          },
        };
        user = await userModel.create(newUser);
      } else {
        // Update existing user
        user.lastLogin = new Date();
        user.githubDetails.token = token;
        await user.save();
      }

      return user;
    } catch (error) {
      console.error("Error in findOrCreateGoogleUser:", error);
      throw error;
    }
  };

  allUsers = async () => {
    const data = await userModel.find();
    return data;
  };
}

module.exports = UserServiceClass;

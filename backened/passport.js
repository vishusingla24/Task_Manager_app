const passport = require("passport");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const authModel = require("./Models/Model");
const bcrypt = require("bcrypt");

// ✅ Check if environment variables are loaded
console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID ? "✅ Loaded" : "❌ Missing");
console.log("Facebook Client ID:", process.env.FACEBOOK_CLIENT_ID ? "✅ Loaded" : "❌ Missing");

const googleCredentials = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:8080/google/callback",
};

const fbCredentials = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL || "http://localhost:8080/facebook/callback",
  profileFields: ["id", "email", "displayName", "picture.type(large)"],
};

// ✅ Google Authentication Callback
const googleCallback = async (accessToken, refreshToken, profile, cb) => {
  try {
    console.log("Google Profile:", profile);
    
    // Ensure profile data exists
    const email = profile.emails?.[0]?.value || null;
    const picUrl = profile.photos?.[0]?.value || null;

    if (!email) {
      return cb(new Error("Google profile does not provide an email"), null);
    }

    const existingUser = await authModel.findOne({ googleId: profile.id });

    if (existingUser) {
      return cb(null, existingUser);
    } else {
      const newUser = new authModel({
        userName: profile.displayName,
        email,
        googleId: profile.id,
        picUrl,
      });
      const savedUser = await newUser.save();
      return cb(null, savedUser);
    }
  } catch (err) {
    return cb(err);
  }
};

// ✅ Facebook Authentication Callback
const facebookCallback = async (accessToken, refreshToken, profile, cb) => {
  try {
    console.log("Facebook Profile:", profile);
    
    // Ensure profile data exists
    const email = profile.emails?.[0]?.value || null;
    const picUrl = profile.photos?.[0]?.value || null;

    if (!email) {
      return cb(new Error("Facebook profile does not provide an email"), null);
    }

    const existingUser = await authModel.findOne({ fbId: profile.id });

    if (existingUser) {
      return cb(null, existingUser);
    } else {
      const newUser = new authModel({
        userName: profile.displayName,
        fbId: profile.id,
        email,
        picUrl,
      });
      const savedUser = await newUser.save();
      return cb(null, savedUser);
    }
  } catch (err) {
    return cb(err);
  }
};

// ✅ Local Authentication Strategy
const localStrategyCallback = async (email, password, done) => {
  try {
    const user = await authModel.findOne({ email });

    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect password" });
    }
  } catch (err) {
    return done(err);
  }
};

// ✅ Register Strategies with Passport
passport.use(new GoogleStrategy(googleCredentials, googleCallback));
passport.use(new FacebookStrategy(fbCredentials, facebookCallback));
passport.use(new LocalStrategy({ usernameField: "email" }, localStrategyCallback));

// ✅ Serialize and Deserialize Users
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await authModel.findById(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

require("./passport");
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const authModel = require("./Models/Model");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const TodoRoutes = require("./Routes/TodoRoutes");
const NoteRoutes = require("./Routes/NoteRoutes");
const TaskRoutes = require("./Routes/TaskRoutes");

const PORT = 8080;
const app = express();

// ✅ CORS Configuration
app.use([
  cors({
    origin: process.env.FRONTEND_DOMAIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
  express.json(),
  express.urlencoded({ extended: true }),
]);

// ✅ MongoDB Session Store
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  collectionName: "session",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({ message: "Hello, welcome to the API!" });
});
app.post("/api/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const existingUser = await authModel.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new authModel({ userName, email, password: hashedPassword }); // ✅ Fixed typo

    const savedUser = await newUser.save();
    res.status(201).json({ success: "User registered successfully!", user: savedUser });
  } catch (err) {
    console.error("Error in /api/register:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Google Authentication
app.get("/api/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/api/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.FRONTEND_DOMAIN || "http://localhost:3000",
    successRedirect: `${process.env.FRONTEND_DOMAIN}/Home`,
  })
);

// ✅ Facebook Authentication (Fix Missing Client ID)
if (process.env.FACEBOOK_CLIENT_ID) {
  app.get("/api/facebook", passport.authenticate("facebook", { scope: ["email"] }));

  app.get(
    "/api/facebook/callback",
    passport.authenticate("facebook", {
      failureRedirect: process.env.FRONTEND_DOMAIN || "http://localhost:3000",
      successRedirect: `${process.env.FRONTEND_DOMAIN}/Home`,
    })
  );
} else {
  console.warn("⚠️ Facebook Client ID is missing. Facebook login is disabled.");
}

// ✅ Local Login
app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ error: "Login failed" });
      res.json({ success: "Successfully logged in", user });
    });
  })(req, res, next);
});

// ✅ Logout
app.get("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.json({ success: "Logged out successfully" });
  });
});

// ✅ Get Logged-in User
app.get("/api/getUser", (req, res) => {
  if (req.user) return res.json(req.user);
  res.status(401).json({ error: "Not authenticated" });
});

// ✅ Forgot & Reset Password
app.post("/api/forgotpass", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await authModel.findOne({ email });

    if (!user) return res.status(404).json({ error: "Email not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `${process.env.FRONTEND_DOMAIN}/ResetPass/${user._id}/${token}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: "Password reset email sent" });
  } catch (error) {
    console.error("Error in /api/forgotpass:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/resetPassword/:id/:token", async (req, res) => {
  try {
    const { id, token } = req.params;
    const { newPassword } = req.body;

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) return res.status(400).json({ error: "Invalid or expired token" });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await authModel.findByIdAndUpdate(id, { password: hashedPassword });
      res.json({ success: "Password updated successfully" });
    });
  } catch (error) {
    console.error("Error in /api/resetPassword:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Authentication Middleware
const authenticator = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Login required" });
  }
  next();
};

// ✅ Protected Routes
app.use("/api/todo", authenticator, TodoRoutes);
app.use("/api/note", authenticator, NoteRoutes);
app.use("/api/task", authenticator, TaskRoutes);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT}`);
});

module.exports = app;

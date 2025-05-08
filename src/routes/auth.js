const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Login Page - prevent caching to avoid showing after login using back button
router.get("/", (req, res) => {
  if (req.session.userId) {
    return res.redirect("/"); // Redirect if already logged in
  }

  res.set("Cache-Control", "no-store"); // Disable caching for login page
  res.render("login");
});

// Handle login form submission (POST request)
router.post("/", async (req, res) => {
  const { user_name, password } = req.body;
  const normalizedUsername = user_name.toLowerCase();

  // Find user by username
  const user = await User.findOne({ where: { user_name: normalizedUsername } });

  // Validate user and password
  if (!user || !(await bcrypt.compare(password, user.user_password))) {
    return res.send("Invalid username or password!");
  }

  // Store session data
  req.session.userId = user.user_id;
  req.session.user = {
    user_id: user.user_id,
    user_name: user.user_name,
    user_role: user.user_role
  };

  // Redirect to home page after login
  res.redirect("/");
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Login Page - prevent caching to avoid back button showing login after auth
router.get("/", (req, res) => {
  if (req.session.userId) {
    return res.redirect("/");
  }

  res.set("Cache-Control", "no-store"); // Disable caching for login page
  res.render("login");
});

// Handle login POST
router.post("/", async (req, res) => {
  const { user_name, password } = req.body;
  const normalizedUsername = user_name.toLowerCase();
  const user = await User.findOne({ where: { user_name: normalizedUsername } });

  if (!user || !(await bcrypt.compare(password, user.user_password))) {
    return res.send("Invalid username or password!");
  }

  req.session.userId = user.user_id;
  req.session.user = {
    user_id: user.user_id,
    user_name: user.user_name,
    user_role: user.user_role
  };
  res.redirect("/");
});

module.exports = router;

const express = require("express");

const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  const user = await User.findByPk(req.session.userId);
  if (!user) return res.redirect("/login");

  res.render("home", {
    userId: user.user_id,
    username: user.user_name,
    role: user.user_role
  });
});

module.exports = router;
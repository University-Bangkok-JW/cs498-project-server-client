const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (!req.session.userId || !req.session.user) {
    return res.redirect("/login");
  }

  // Use cached user data
  const user = req.session.user;

  // Cache for 30 days (2592000 seconds)
  res.set("Cache-Control", "private, max-age=2592000");

  res.render("learning", {
    userId: user.user_id,
    username: user.user_name,
    role: user.user_role
  });
});

module.exports = router;

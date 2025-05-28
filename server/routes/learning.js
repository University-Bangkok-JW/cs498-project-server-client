const express = require("express");
const router = express.Router();

// Learning page route
router.get("/", (req, res) => {
  if (!req.session.userId || !req.session.user) {
    return res.redirect("/login"); // Redirect if not authenticated
  }

  // Use cached user data from session
  const user = req.session.user;

  // Set client-side cache to 30 days (in seconds)
  res.set("Cache-Control", "private, max-age=2592000");

  // Render the learning page view with user data
  res.render("learning", {
    userId: user.user_id,
    username: user.user_name,
    role: user.user_role
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();

// Logout route
router.get("/", (req, res) => {
  // Destroy the session to log the user out
  req.session.destroy(err => {
    if (err) {
      console.error("Logout Error:", err);
      return res.send("Logout failed!");
    }

    // Prevent caching after logout
    res.set("Cache-Control", "no-store");

    // Redirect to login page after logout
    res.redirect("/login");
  });
});

module.exports = router;

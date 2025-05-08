const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Logout Error:", err);
      return res.send("Logout failed!");
    }
  
    res.set("Cache-Control", "no-store");
    res.redirect("/login");
  });
});

module.exports = router;

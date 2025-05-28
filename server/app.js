// Load environment variables from .env file (disabled in production)
// require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

// Utility functions for database and user setup
const { ensureDatabaseExists } = require("./utils/fileHandler");
const { addUser } = require("./utils/userHandler");

const app = express();
const port = process.env.PORT || 3000;

// Ensure the database exists and tables are created
ensureDatabaseExists().then(() => {
  console.log("Adding default users...");
  console.log("Admin email:", "admin@example.com");
  console.log("User email:", "user@example.com");

  // Add default admin and user accounts
  return Promise.all([
    addUser("jetsada", "admin@example.com", "admin", "1234"),
    addUser("owen", "user@example.com", "user", "1234")
  ]);
}).then(() => {
  console.log("Default users added.");
}).catch((err) => {
  console.error("Database setup error:", err);
});

// Middleware setup
app.set("view engine", "ejs"); // Set EJS as the templating engine
app.use(bodyParser.urlencoded({ extended: true })); // Parse form submissions
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret", // Session secret
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/", require("./routes/home"));
app.use("/learning", require("./routes/learning"));
app.use("/login", require("./routes/auth"));
app.use("/logout", require("./routes/logout"));

// Catch-all route to handle undefined routes
app.use((req, res) => {
  res.redirect("/");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

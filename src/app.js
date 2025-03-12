require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const { ensureDatabaseExists } = require("./utils/fileHandler");
const { addUser } = require("./utils/userHandler");

const app = express();
const port = process.env.PORT || 3000;

// Ensure the database exists and tables are created
ensureDatabaseExists().then(() => {
  console.log("Adding default users...");
  console.log("Admin email:", "admin@example.com");
  console.log("User email:", "user@example.com");
  
  return Promise.all([
    addUser("admin", "admin@example.com", "admin", "1234"),
    addUser("user", "user@example.com", "user", "1234")
  ]);
}).then(() => {
  console.log("Default users added.");
}).catch((err) => {
  console.error("Database setup error:", err);
});


// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/", require("./routes/home"));
app.use("/learning", require("./routes/learning"));
app.use("/login", require("./routes/auth"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const sequelize = require("../db/database");

async function ensureDatabaseExists() {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL database.");
    await sequelize.sync({ force: true }); // WARNING: This will delete existing data
    console.log("Database is ready.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

module.exports = { ensureDatabaseExists };

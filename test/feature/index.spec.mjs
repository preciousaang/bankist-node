import { require } from "../../src/common/utils.mjs";
const db = require("../../src/models");

// Sync the models with the database (create tables)
before(async () => {
  await db.sequelize.sync({ force: true }); // Force sync to drop existing tables
});

// Cleanup after tests
after(async () => {
  await db.sequelize.close(); // Close the database connection
});

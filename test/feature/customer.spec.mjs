import { app } from "../../src/app.mjs";
import request from "supertest";
import { expect } from "chai";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const db = require("../../src/models");

// Sync the models with the database (create tables)
before(async () => {
  await db.sequelize.sync({ force: true }); // Force sync to drop existing tables
});

// Cleanup after tests
after(async () => {
  await db.sequelize.close(); // Close the database connection
});

describe("Customer tests", () => {
  it("customer can be created", async () => {
    const response = await request(app).post("/customers");
    expect(response.status).to.equal(201);

    expect(response.body["customer"]).to.include({
      firstName: "Precious",
      lastName: "Ibeagi",
    });
  });
});

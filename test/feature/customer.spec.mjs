import { app } from "../../src/app.mjs";
import request from "supertest";
import { expect } from "chai";
import { require } from "../../src/common/utils.mjs";

const db = require("../../src/models");

// Sync the models with the database (create tables)
before(async () => {
  await db.sequelize.sync({ force: true }); // Force sync to drop existing tables
});

describe("Customer tests", () => {
  it("customer can be created", async () => {
    const response = await request(app).post("/customers").send({
      firstName: "Precious",
      lastName: "Ibeagi",
      email: "email@precious.test",
    });

    expect(response.status).to.equal(201);

    expect(response.body["customer"]).to.include({
      firstName: "Precious",
      lastName: "Ibeagi",
      email: "email@precious.test",
    });
  });

  it("should not create customers with the duplicate", async () => {
    await db.Customer.create({
      firstName: "Precious",
      lastName: "Ibeagi",
      email: "email@precious.test",
    });

    const response = await request(app).post("/customers").send({
      firstName: "Precious",
      lastName: "Ibeagi",
      email: "email@precious.test",
    });

    expect(response.status).to.equal(422);
  });
});

// Cleanup after tests
after(async () => {
  await db.sequelize.close(); // Close the database connection
});

import { app } from "../../src/app.mjs";
import request from "supertest";
import { should } from "chai";
import { require } from "../../src/common/utils.mjs";
const db = require("../../src/models");

should();

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

    response.status.should.equal(201);

    response.body.customer.should.include({
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

    response.status.should.equal(422);
    response.body.should.have.property("errors");

    const hasExpectedError = response.body.errors.some((err) =>
      err.msg.includes("A customer with that email already exists")
    );

    hasExpectedError.should.be.true;
  });

  it("should be able to list customers", async () => {
    const response = await request(app)
      .get("/customers")
      .send({ page: 1, perPage: 20 });

    response.status.should.equal(200);
    response.body.should.include.keys(["currentPage", "perPage", "data"]);
    response.body.data.should.be.an("array").and.should.not.be.empty;

    response.body.data.forEach((customer) => {
      customer.should.include.keys(["firstName", "lastName", "email", "id"]);
    });
  });
});

// Cleanup after tests
after(async () => {
  await db.sequelize.close(); // Close the database connection
});

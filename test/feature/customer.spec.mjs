import { app } from "../../src/app.mjs";
import request from "supertest";
import { should, expect } from "chai";

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

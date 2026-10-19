import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { connectDb, disconnectDb } from "../src/config/db.js";
import { ContactMessageModel } from "../src/modules/contact/contact.model.js";
import { EnrollmentModel } from "../src/modules/enrollments/enrollment.model.js";

// Uses MONGODB_TEST_URI when set (e.g. a local MongoDB); otherwise starts an in-memory MongoDB.
let mongo: MongoMemoryServer | undefined;
const app = createApp({ corsOrigins: ["http://localhost:5173"] });

beforeAll(async () => {
  const uri = process.env.MONGODB_TEST_URI ?? (mongo = await MongoMemoryServer.create()).getUri();
  await connectDb(uri);
});

afterAll(async () => {
  await disconnectDb();
  await mongo?.stop();
});

beforeEach(async () => {
  await Promise.all([EnrollmentModel.deleteMany({}), ContactMessageModel.deleteMany({})]);
});

const validEnrollment = {
  name: "Ali Raza",
  email: "Ali@Example.com",
  whatsapp: "0300-1234567",
  courseSlug: "shopify-development",
  paymentMethod: "jazzcash",
  transactionId: "",
};

describe("POST /api/enrollments", () => {
  it("saves a pending enrolment with a normalised email and WhatsApp number", async () => {
    const res = await request(app).post("/api/enrollments").send(validEnrollment);

    expect(res.status).toBe(201);
    const saved = await EnrollmentModel.findById(res.body.id).lean();
    expect(saved).toMatchObject({ email: "ali@example.com", whatsapp: "+923001234567", status: "pending" });
    expect(saved?.transactionId).toBeUndefined();
  });

  it("rejects an unknown course and a missing payment method", async () => {
    const res = await request(app)
      .post("/api/enrollments")
      .send({ ...validEnrollment, courseSlug: "", paymentMethod: "" });

    expect(res.status).toBe(400);
    expect(res.body.fields).toMatchObject({ courseSlug: "Please choose a course", paymentMethod: "Please choose how you paid" });
  });

  it("requires a valid Pakistani WhatsApp number", async () => {
    const res = await request(app).post("/api/enrollments").send({ ...validEnrollment, whatsapp: "12345" });
    expect(res.status).toBe(400);
    expect(res.body.fields).toHaveProperty("whatsapp");
  });
});

describe("POST /api/contact", () => {
  it("saves a hiring enquiry and replies with the hiring message", async () => {
    const res = await request(app)
      .post("/api/contact")
      .send({ name: "Sara", email: "hr@company.pk", company: "Acme", topic: "hiring", message: "Two junior Shopify developers" });

    expect(res.status).toBe(201);
    expect(res.body.message).toMatch(/hiring/);
    expect(await ContactMessageModel.countDocuments({ topic: "hiring" })).toBe(1);
  });

  it("accepts an empty optional WhatsApp field and rejects a short message", async () => {
    const res = await request(app).post("/api/contact").send({ name: "Sara", email: "sara@example.com", whatsapp: "", message: "hi" });
    expect(res.status).toBe(400);
    expect(Object.keys(res.body.fields)).toEqual(["message"]);
  });
});

describe("API basics", () => {
  it("responds to the health check", async () => {
    await request(app).get("/api/health").expect(200, { ok: true });
  });

  it("returns JSON 404 for unknown API routes", async () => {
    await request(app).get("/api/nope").expect(404, { error: "Not found" });
  });
});

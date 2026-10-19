import { Router } from "express";
import { formLimiter } from "../shared/rate-limit.js";
import { ContactMessageModel } from "./contact.model.js";
import { CreateContactMessageSchema } from "./contact.schema.js";

export const contactRouter = Router();

contactRouter.post("/", formLimiter, async (req, res) => {
  const input = CreateContactMessageSchema.parse(req.body);
  await ContactMessageModel.create(input);

  res.status(201).json({
    ok: true,
    message:
      input.topic === "hiring"
        ? "Thanks! We'll get back to you about your hiring needs within 2 working days."
        : "Thanks for your message! We'll reply within 2 working days.",
  });
});

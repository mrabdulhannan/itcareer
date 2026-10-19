import { Router } from "express";
import { formLimiter } from "../shared/rate-limit.js";
import { EnrollmentModel } from "./enrollment.model.js";
import { CreateEnrollmentSchema } from "./enrollment.schema.js";

export const enrollmentRouter = Router();

enrollmentRouter.post("/", formLimiter, async (req, res) => {
  const input = CreateEnrollmentSchema.parse(req.body);
  const enrollment = await EnrollmentModel.create(input);

  res.status(201).json({
    ok: true,
    id: enrollment.id,
    message: "Thanks! We've received your enrolment. We'll confirm your payment on WhatsApp and send your course access.",
  });
});

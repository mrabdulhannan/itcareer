import { Schema, model, type InferSchemaType } from "mongoose";
import { ENROLLABLE_COURSES, ENROLLMENT_STATUSES, PAYMENT_METHODS } from "./enrollment.schema.js";

const enrollmentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    whatsapp: { type: String, required: true },
    courseSlug: { type: String, enum: ENROLLABLE_COURSES, required: true },
    paymentMethod: { type: String, enum: PAYMENT_METHODS, required: true },
    transactionId: { type: String },
    // Payments are checked by hand for now; an admin moves the request to confirmed.
    status: { type: String, enum: ENROLLMENT_STATUSES, default: "pending" },
  },
  { timestamps: true },
);

export type Enrollment = InferSchemaType<typeof enrollmentSchema>;
export const EnrollmentModel = model("Enrollment", enrollmentSchema);

import { z } from "zod";
import { email, pakistaniMobile, personName } from "../shared/validators.js";

// Courses that currently accept enrolments. Keep in sync with client/src/config/site.ts.
export const ENROLLABLE_COURSES = ["shopify-development", "cyber-security"] as const;
export const PAYMENT_METHODS = ["jazzcash", "easypaisa", "bank-transfer"] as const;
export const ENROLLMENT_STATUSES = ["pending", "confirmed", "cancelled"] as const;

export const CreateEnrollmentSchema = z.object({
  name: personName,
  email,
  whatsapp: pakistaniMobile,
  courseSlug: z.enum(ENROLLABLE_COURSES, "Please choose a course"),
  paymentMethod: z.enum(PAYMENT_METHODS, "Please choose how you paid"),
  transactionId: z.string().trim().max(60).optional().transform((value) => value || undefined),
});

export type CreateEnrollmentInput = z.infer<typeof CreateEnrollmentSchema>;

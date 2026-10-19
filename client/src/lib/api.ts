import type { CourseSlug } from "../config/site";

export type PaymentMethod = "jazzcash" | "easypaisa" | "bank-transfer";
export type ContactTopic = "general" | "course" | "hiring";

export interface EnrollmentInput {
  name: string;
  email: string;
  whatsapp: string;
  courseSlug: CourseSlug | "";
  paymentMethod: PaymentMethod | "";
  transactionId?: string;
}

export interface ContactInput {
  name: string;
  email: string;
  whatsapp?: string;
  topic: ContactTopic;
  company?: string;
  message: string;
}

export interface ApiResult {
  ok: boolean;
  message?: string;
  error?: string;
  fields?: Record<string, string>;
}

async function post(path: string, body: unknown): Promise<ApiResult> {
  try {
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as ApiResult;
    return res.ok ? data : { ...data, ok: false };
  } catch {
    return { ok: false, error: "Couldn't reach the server. Check your connection and try again." };
  }
}

export const createEnrollment = (input: EnrollmentInput) => post("/api/enrollments", input);
export const sendContactMessage = (input: ContactInput) => post("/api/contact", input);

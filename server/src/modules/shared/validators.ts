import { z } from "zod";

// Accepts 03XXXXXXXXX, +923XXXXXXXXX or 923XXXXXXXXX (spaces and dashes allowed) and returns +923XXXXXXXXX.
export const pakistaniMobile = z
  .string()
  .trim()
  .transform((value) => value.replace(/[\s-]/g, ""))
  .refine((value) => /^(\+92|92|0)3\d{9}$/.test(value), "Enter a Pakistani mobile number, e.g. 0300 1234567")
  .transform((value) => `+92${value.replace(/^(\+92|92|0)/, "")}`);

/** An optional mobile field where an empty string means "not given". */
export const optionalPakistaniMobile = z.union([z.literal("").transform(() => undefined), pakistaniMobile]).optional();

export const personName = z.string().trim().min(2, "Please enter your name").max(80);

export const email = z.email("Enter a valid email address").trim().toLowerCase();

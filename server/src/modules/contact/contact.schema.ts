import { z } from "zod";
import { email, optionalPakistaniMobile, personName } from "../shared/validators.js";

export const CONTACT_TOPICS = ["general", "course", "hiring"] as const;

export const CreateContactMessageSchema = z.object({
  name: personName,
  email,
  whatsapp: optionalPakistaniMobile,
  topic: z.enum(CONTACT_TOPICS).default("general"),
  company: z.string().trim().max(120).optional().transform((value) => value || undefined),
  message: z.string().trim().min(10, "Please write a little more (at least 10 characters)").max(2000),
});

export type CreateContactMessageInput = z.infer<typeof CreateContactMessageSchema>;

import { Schema, model, type InferSchemaType } from "mongoose";
import { CONTACT_TOPICS } from "./contact.schema.js";

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String },
    topic: { type: String, enum: CONTACT_TOPICS, required: true, index: true },
    company: { type: String },
    message: { type: String, required: true },
    handled: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type ContactMessage = InferSchemaType<typeof contactMessageSchema>;
export const ContactMessageModel = model("ContactMessage", contactMessageSchema);

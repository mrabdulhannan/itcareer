import { site } from "../config/site";

export type Channel = "whatsapp" | "email";

/** Builds a wa.me link that opens a chat with ITcareer.pk, optionally with the message already typed. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Builds a mailto link to the ITcareer.pk inbox with the subject and body filled in. */
export function emailLink(subject: string, body: string): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export interface Enquiry {
  title: string;
  fields: Record<string, string | undefined>;
}

/** Returns the link that sends the enquiry on the chosen channel, skipping empty fields. */
export function enquiryLink({ title, fields }: Enquiry, channel: Channel): string {
  const filled = Object.entries(fields).filter(([, value]) => value && value.trim());
  if (channel === "email") {
    return emailLink(title, filled.map(([label, value]) => `${label}: ${value!.trim()}`).join("\n"));
  }
  const lines = filled.map(([label, value]) => `*${label}:* ${value!.trim()}`);
  return whatsappLink([`*${title}*`, "", ...lines].join("\n"));
}

import type { FormEvent } from "react";
import { site } from "../config/site";
import { sendContactMessage, type ContactTopic } from "../lib/api";
import { useSubmit } from "../lib/useSubmit";
import { FormMessage, SectionHeading, SelectField, SubmitButton, TextAreaField, TextField } from "./Field";
import { WhatsAppIcon } from "./Icons";
import { SocialLinks } from "./SocialLinks";

export function Contact() {
  const { status, fieldErrors, submit } = useSubmit(sendContactMessage);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    void submit({
      name: String(form.get("contact-name") ?? ""),
      email: String(form.get("contact-email") ?? ""),
      whatsapp: String(form.get("contact-whatsapp") ?? ""),
      topic: String(form.get("contact-topic") ?? "general") as ContactTopic,
      message: String(form.get("contact-message") ?? ""),
    });
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="Contact" title="Talk to us" intro="Questions about a course, fees or timings? Send a message and we'll reply within 2 working days." />
          <div className="mt-8 space-y-4">
            {site.whatsappNumber && (
              <a
                href={`https://wa.me/${site.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-[#25D366] px-5 py-4 font-bold text-white hover:brightness-95"
              >
                <WhatsAppIcon width={24} height={24} /> Chat on WhatsApp
              </a>
            )}
            <a href={`mailto:${site.email}`} className="block rounded-2xl px-5 py-4 font-semibold ring-1 ring-slate-200 hover:ring-brand-500">
              ✉️ {site.email}
            </a>
            <div className="pt-2">
              <p className="mb-3 text-sm font-semibold text-ink-500">Follow @officialitcareer</p>
              <SocialLinks />
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-9">
          {status.kind === "done" ? (
            <FormMessage kind="done">{status.message}</FormMessage>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <TextField id="contact-name" label="Name" autoComplete="name" error={fieldErrors.name} required />
              <TextField id="contact-email" label="Email" type="email" autoComplete="email" error={fieldErrors.email} required />
              <TextField
                id="contact-whatsapp"
                label="WhatsApp"
                hint="optional"
                type="tel"
                inputMode="tel"
                placeholder="0300 1234567"
                error={fieldErrors.whatsapp}
              />
              <SelectField id="contact-topic" label="About" defaultValue="course">
                <option value="course">A course</option>
                <option value="general">Something else</option>
              </SelectField>
              <TextAreaField id="contact-message" label="Message" className="sm:col-span-2" error={fieldErrors.message} required />
              <div className="space-y-3 sm:col-span-2">
                <SubmitButton sending={status.kind === "sending"}>Send message</SubmitButton>
                {status.kind === "error" && <FormMessage kind="error">{status.message}</FormMessage>}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

import type { FormEvent } from "react";
import { site } from "../config/site";
import { submittedChannel, useEnquiryForm } from "../lib/useSubmit";
import { checkMessage, checkMobile, checkName, collectErrors } from "../lib/validate";
import { FormError, SectionHeading, SelectField, SendButtons, SentMessage, TextAreaField, TextField } from "./Field";
import { WhatsAppIcon } from "./Icons";
import { SocialLinks } from "./SocialLinks";
import { whatsappLink } from "../lib/send";

export function Contact() {
  const { status, fieldErrors, submit, reset } = useEnquiryForm();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const get = (key: string) => String(form.get(key) ?? "");
    const name = get("contact-name");
    const phone = get("contact-whatsapp");
    const message = get("contact-message");

    const enquiry = {
      title: `Question about ${get("contact-topic")} – ITcareer.pk`,
      fields: {
        Name: name,
        Phone: phone,
        Message: message,
      },
    };
    submit(
      collectErrors({ name: checkName(name), whatsapp: checkMobile(phone, { optional: true }), message: checkMessage(message) }),
      enquiry,
      submittedChannel(event),
    );
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Talk to us"
            intro="Questions about a course, fees or timings? Message or call us and we'll get back to you quickly."
          />
          <div className="mt-8 space-y-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-2xl bg-[#25D366] px-5 py-4 font-bold text-white hover:brightness-95"
            >
              <WhatsAppIcon width={24} height={24} /> Chat on WhatsApp
            </a>
            <a
              href={`tel:${site.phone.tel}`}
              className="block rounded-2xl px-5 py-4 font-semibold ring-1 ring-slate-200 hover:ring-brand-500"
            >
              📞 Call {site.phone.display}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="block rounded-2xl px-5 py-4 font-semibold ring-1 ring-slate-200 hover:ring-brand-500"
            >
              ✉️ {site.email}
            </a>
            <div className="pt-2">
              <p className="mb-3 text-sm font-semibold text-ink-500">Follow @officialitcareer</p>
              <SocialLinks />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-9">
          {status.kind === "done" ? (
            <SentMessage status={status} onBack={reset} />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <TextField id="contact-name" label="Name" autoComplete="name" error={fieldErrors.name} required />
              <TextField
                id="contact-whatsapp"
                label="Phone"
                hint="optional"
                type="tel"
                inputMode="tel"
                placeholder="0300 1234567"
                error={fieldErrors.whatsapp}
              />
              <SelectField id="contact-topic" label="About" className="sm:col-span-2" defaultValue="a course">
                <option value="a course">A course</option>
                <option value="something else">Something else</option>
              </SelectField>
              <TextAreaField id="contact-message" label="Message" className="sm:col-span-2" error={fieldErrors.message} required />
              <div className="space-y-3 sm:col-span-2">
                <SendButtons />
                {status.kind === "error" && <FormError>{status.message}</FormError>}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

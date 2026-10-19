import type { FormEvent } from "react";
import { submittedChannel, useEnquiryForm } from "../lib/useSubmit";
import { checkEmail, checkMessage, checkName, collectErrors } from "../lib/validate";
import { FormError, SendButtons, SentMessage, TextAreaField, TextField } from "./Field";
import { CheckIcon } from "./Icons";

export function Employers() {
  const { status, fieldErrors, submit, reset } = useEnquiryForm();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const get = (key: string) => String(form.get(key) ?? "");
    const name = get("hire-name");
    const email = get("hire-email");
    const roles = get("hire-message");

    const enquiry = {
      title: "Hiring enquiry – ITcareer.pk",
      fields: {
        Name: name,
        Company: get("hire-company"),
        Email: email,
        Roles: roles,
      },
    };
    submit(
      collectErrors({ name: checkName(name), email: checkEmail(email), message: checkMessage(roles) }),
      enquiry,
      submittedChannel(event),
    );
  }

  return (
    <section id="jobs" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-10 overflow-hidden rounded-3xl bg-brand-900 p-8 text-white sm:p-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-300">For companies</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Hiring IT talent in Pakistan?</h2>
          <p className="mt-4 text-white/80">
            ITcareer.pk is building a job platform made only for Pakistan's IT industry. Until it launches, tell us what roles you're hiring
            for and we'll connect you with trained candidates from our courses and community.
          </p>
          <ul className="mt-6 space-y-3">
            {["Shopify and e-commerce developers", "Entry-level security and IT support", "Candidates trained on real projects"].map(
              (item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon className="mt-0.5 shrink-0 text-emerald-300" /> {item}
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-6 text-ink-900 sm:p-8">
          {status.kind === "done" ? (
            <SentMessage status={status} onBack={reset} />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-4">
              <TextField id="hire-name" label="Your name" autoComplete="name" error={fieldErrors.name} required />
              <TextField id="hire-company" label="Company" autoComplete="organization" />
              <TextField id="hire-email" label="Work email" type="email" autoComplete="email" error={fieldErrors.email} required />
              <TextAreaField
                id="hire-message"
                label="Roles you're hiring for"
                placeholder="e.g. 2 junior Shopify developers, Lahore, onsite"
                error={fieldErrors.message}
                required
              />
              <SendButtons />
              {status.kind === "error" && <FormError>{status.message}</FormError>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

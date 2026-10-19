import type { FormEvent } from "react";
import { sendContactMessage } from "../lib/api";
import { useSubmit } from "../lib/useSubmit";
import { FormMessage, SubmitButton, TextAreaField, TextField } from "./Field";
import { CheckIcon } from "./Icons";

export function Employers() {
  const { status, fieldErrors, submit } = useSubmit(sendContactMessage);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    void submit({
      name: String(form.get("hire-name") ?? ""),
      email: String(form.get("hire-email") ?? ""),
      company: String(form.get("hire-company") ?? ""),
      message: String(form.get("hire-message") ?? ""),
      topic: "hiring",
    });
  }

  return (
    <section id="jobs" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-10 overflow-hidden rounded-3xl bg-brand-900 p-8 text-white sm:p-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-300">For companies</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Hiring IT talent in Pakistan?</h2>
          <p className="mt-4 text-white/80">
            ITcareer.pk is building a job platform made only for Pakistan's IT industry. Until it launches, tell us what
            roles you're hiring for and we'll connect you with trained candidates from our courses and community.
          </p>
          <ul className="mt-6 space-y-3">
            {["Shopify and e-commerce developers", "Entry-level security and IT support", "Candidates trained on real projects"].map((item) => (
              <li key={item} className="flex gap-3">
                <CheckIcon className="mt-0.5 shrink-0 text-emerald-300" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-6 text-ink-900 sm:p-8">
          {status.kind === "done" ? (
            <FormMessage kind="done">{status.message}</FormMessage>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-4">
              <TextField id="hire-name" label="Your name" autoComplete="name" error={fieldErrors.name} required />
              <TextField id="hire-company" label="Company" autoComplete="organization" error={fieldErrors.company} />
              <TextField id="hire-email" label="Work email" type="email" autoComplete="email" error={fieldErrors.email} required />
              <TextAreaField
                id="hire-message"
                label="Roles you're hiring for"
                placeholder="e.g. 2 junior Shopify developers, Lahore, onsite"
                error={fieldErrors.message}
                required
              />
              <SubmitButton sending={status.kind === "sending"}>Send hiring request</SubmitButton>
              {status.kind === "error" && <FormMessage kind="error">{status.message}</FormMessage>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

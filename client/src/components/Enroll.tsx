import { useEffect, useState, type FormEvent } from "react";
import { courses, site, type CourseSlug } from "../config/site";
import { createEnrollment, type EnrollmentInput, type PaymentMethod } from "../lib/api";
import { useSubmit } from "../lib/useSubmit";
import { FormMessage, SectionHeading, SelectField, SubmitButton, TextField } from "./Field";

const paymentOptions: { value: PaymentMethod; account: { title: string; accountName: string | null; accountNumber: string | null; bank?: string | null } }[] = [
  { value: "jazzcash", account: site.payment.jazzcash },
  { value: "easypaisa", account: site.payment.easypaisa },
  { value: "bank-transfer", account: site.payment.bankTransfer },
];

export function Enroll({ selectedCourse }: { selectedCourse: CourseSlug | "" }) {
  const [course, setCourse] = useState<CourseSlug | "">(selectedCourse);
  const { status, fieldErrors, submit } = useSubmit(createEnrollment);

  useEffect(() => {
    if (selectedCourse) setCourse(selectedCourse);
  }, [selectedCourse]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    void submit({
      name: String(form.get("enroll-name") ?? ""),
      email: String(form.get("enroll-email") ?? ""),
      whatsapp: String(form.get("enroll-whatsapp") ?? ""),
      courseSlug: course,
      paymentMethod: String(form.get("enroll-payment") ?? "") as EnrollmentInput["paymentMethod"],
      transactionId: String(form.get("enroll-txn") ?? ""),
    });
  }

  return (
    <section id="enroll" className="bg-slate-50 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Enroll now"
            title="Reserve your seat"
            intro="Seats in each weekend batch are limited so everyone gets attention. Pay the fee, then submit this form with your transaction ID."
          />
          <div className="mt-8 space-y-3">
            {paymentOptions.map(({ value, account }) => (
              <div key={value} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                <p className="font-bold">{account.title}</p>
                {account.accountNumber ? (
                  <p className="mt-1 text-sm text-ink-700">
                    {account.bank && <>{account.bank} · </>}
                    {account.accountName} · <span className="font-mono font-semibold">{account.accountNumber}</span>
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-ink-500">Account details are shared on WhatsApp.</p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-500">
            Have a question first?{" "}
            <a href="#contact" className="font-semibold text-brand-700 underline">
              Contact us
            </a>
            .
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-9">
          {status.kind === "done" ? (
            <FormMessage kind="done">{status.message}</FormMessage>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <SelectField
                id="enroll-course"
                label="Course"
                className="sm:col-span-2"
                value={course}
                onChange={(e) => setCourse(e.target.value as CourseSlug)}
                error={fieldErrors.courseSlug}
                required
              >
                <option value="">Select a course</option>
                {courses.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.title} ({c.badge})
                  </option>
                ))}
              </SelectField>
              <TextField id="enroll-name" label="Full name" autoComplete="name" placeholder="Your name" error={fieldErrors.name} required />
              <TextField id="enroll-email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" error={fieldErrors.email} required />
              <TextField
                id="enroll-whatsapp"
                label="WhatsApp number"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="0300 1234567"
                error={fieldErrors.whatsapp}
                required
              />
              <SelectField id="enroll-payment" label="Paid with" defaultValue="" error={fieldErrors.paymentMethod} required>
                <option value="">Select a method</option>
                {paymentOptions.map(({ value, account }) => (
                  <option key={value} value={value}>
                    {account.title}
                  </option>
                ))}
              </SelectField>
              <TextField
                id="enroll-txn"
                label="Transaction ID"
                hint="optional"
                className="sm:col-span-2"
                placeholder="e.g. 0123456789"
                error={fieldErrors.transactionId}
              />
              <div className="sm:col-span-2 space-y-3">
                <SubmitButton sending={status.kind === "sending"}>Submit enrolment</SubmitButton>
                {status.kind === "error" && <FormMessage kind="error">{status.message}</FormMessage>}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

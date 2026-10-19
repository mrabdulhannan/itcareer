import { useEffect, useState, type FormEvent } from "react";
import { courses, site, type CourseSlug } from "../config/site";
import { submittedChannel, useEnquiryForm } from "../lib/useSubmit";
import { checkEmail, checkMobile, checkName, checkRequired, collectErrors } from "../lib/validate";
import { FormError, SectionHeading, SelectField, SendButtons, SentMessage, TextField } from "./Field";

type Account = { title: string; accountName: string | null; accountNumber: string | null; bank?: string | null };

const paymentOptions: Account[] = [site.payment.jazzcash, site.payment.easypaisa, site.payment.bankTransfer];

export function Enroll({ selectedCourse }: { selectedCourse: CourseSlug | "" }) {
  const [course, setCourse] = useState<CourseSlug | "">(selectedCourse);
  const { status, fieldErrors, submit, reset } = useEnquiryForm();

  useEffect(() => {
    if (selectedCourse) setCourse(selectedCourse);
  }, [selectedCourse]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const get = (key: string) => String(form.get(key) ?? "");
    const name = get("enroll-name");
    const email = get("enroll-email");
    const whatsapp = get("enroll-whatsapp");
    const payment = get("enroll-payment");

    const errors = collectErrors({
      courseSlug: checkRequired(course, "Please choose a course"),
      name: checkName(name),
      email: checkEmail(email),
      whatsapp: checkMobile(whatsapp),
      paymentMethod: checkRequired(payment, "Please choose how you paid"),
    });

    const enquiry = {
      title: "New enrolment – ITcareer.pk",
      fields: {
        Course: courses.find((c) => c.slug === course)?.title,
        Name: name,
        Email: email,
        WhatsApp: whatsapp,
        "Paid with": payment,
        "Transaction ID": get("enroll-txn"),
      },
    };
    submit(errors, enquiry, submittedChannel(event));
  }

  return (
    <section id="enroll" className="bg-slate-50 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Enroll now"
            title="Reserve your seat"
            intro="Seats in each weekend batch are limited so everyone gets attention. Pay the fee, then send us your details with the transaction ID."
          />
          <div className="mt-8 space-y-3">
            {paymentOptions.map((account) => (
              <div key={account.title} className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
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

        <div className="flex flex-col justify-center rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-9">
          {status.kind === "done" ? (
            <SentMessage status={status} onBack={reset} />
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
              <TextField
                id="enroll-email"
                label="Email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                error={fieldErrors.email}
                required
              />
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
                {paymentOptions.map((account) => (
                  <option key={account.title} value={account.title}>
                    {account.title}
                  </option>
                ))}
              </SelectField>
              <TextField id="enroll-txn" label="Transaction ID" hint="optional" className="sm:col-span-2" placeholder="e.g. 0123456789" />
              <div className="space-y-3 sm:col-span-2">
                <SendButtons whatsappLabel="Send on WhatsApp" />
                {status.kind === "error" && <FormError>{status.message}</FormError>}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

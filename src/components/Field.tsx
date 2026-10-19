import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import type { Channel } from "../lib/send";
import { WhatsAppIcon } from "./Icons";

const control =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-ink-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 aria-[invalid=true]:border-red-500";

interface WrapperProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

function Wrapper({ id, label, hint, error, className, children }: WrapperProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink-700">
        {label} {hint && <span className="font-normal text-ink-500">({hint})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

type Common = { id: string; label: string; hint?: string; error?: string; className?: string };

export function TextField({ id, label, hint, error, className, ...props }: Common & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} className={className}>
      <input id={id} name={id} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} className={control} {...props} />
    </Wrapper>
  );
}

export function SelectField({ id, label, hint, error, className, children, ...props }: Common & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} className={className}>
      <select id={id} name={id} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} className={control} {...props}>
        {children}
      </select>
    </Wrapper>
  );
}

export function TextAreaField({ id, label, hint, error, className, ...props }: Common & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrapper id={id} label={label} hint={hint} error={error} className={className}>
      <textarea
        id={id}
        name={id}
        rows={4}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={control}
        {...props}
      />
    </Wrapper>
  );
}

/** The pair of submit buttons every enquiry form uses; the clicked one decides the channel. */
export function SendButtons({ whatsappLabel = "Send on WhatsApp" }: { whatsappLabel?: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="submit"
        name="channel"
        value="whatsapp"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 text-base font-bold text-white transition hover:bg-brand-600"
      >
        <WhatsAppIcon /> {whatsappLabel}
      </button>
      <button
        type="submit"
        name="channel"
        value="email"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-bold text-ink-900 ring-1 ring-slate-300 transition hover:ring-brand-500"
      >
        ✉️ Send by email
      </button>
    </div>
  );
}

/** Shown after a form opens WhatsApp or the email app, with a link in case nothing opened. */
export function SentMessage({ status, onBack }: { status: { channel: Channel; href: string }; onBack: () => void }) {
  const app = status.channel === "email" ? "Your email app" : "WhatsApp";
  return (
    <div role="status" className="rounded-2xl bg-brand-50 p-6 text-center">
      <p className="font-bold text-brand-700">{app} has opened with your details.</p>
      <p className="mt-1 text-ink-700">Press send to finish. We usually reply within a few hours.</p>
      <p className="mt-4 text-sm">
        Didn't open?{" "}
        <a href={status.href} target="_blank" rel="noreferrer" className="font-semibold text-brand-700 underline">
          Try again
        </a>{" "}
        ·{" "}
        <button type="button" onClick={onBack} className="font-semibold text-brand-700 underline">
          Edit details
        </button>
      </p>
    </div>
  );
}

export function FormError({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="text-center text-sm text-red-600">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-sm font-bold uppercase tracking-widest text-brand-700">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {intro && <p className="mt-3 text-lg text-ink-700">{intro}</p>}
    </div>
  );
}

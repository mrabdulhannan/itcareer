import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

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
      <textarea id={id} name={id} rows={4} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} className={control} {...props} />
    </Wrapper>
  );
}

export function SubmitButton({ sending, children }: { sending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={sending}
      className="w-full rounded-xl bg-brand-700 px-6 py-3.5 text-base font-bold text-white transition hover:bg-brand-600 disabled:opacity-60"
    >
      {sending ? "Sending…" : children}
    </button>
  );
}

export function FormMessage({ kind, children }: { kind: "done" | "error"; children: ReactNode }) {
  return kind === "done" ? (
    <div role="status" className="rounded-2xl bg-brand-50 p-6 text-center font-semibold text-brand-700">
      {children}
    </div>
  ) : (
    <p role="alert" className="text-center text-sm text-red-600">
      {children}
    </p>
  );
}

export function SectionHeading({ eyebrow, title, intro, center = false }: { eyebrow: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-sm font-bold uppercase tracking-widest text-brand-700">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {intro && <p className="mt-3 text-lg text-ink-700">{intro}</p>}
    </div>
  );
}

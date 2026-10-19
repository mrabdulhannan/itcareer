import { faqs } from "../config/site";
import { SectionHeading } from "./Field";

export function Faq() {
  return (
    <section id="faq" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Questions students ask" center />
        <div className="mt-10 divide-y divide-slate-200 rounded-2xl bg-white ring-1 ring-slate-200">
          {faqs.map((faq) => (
            <details key={faq.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                {faq.q}
                <span className="text-2xl leading-none text-brand-700 transition group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 text-ink-700">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

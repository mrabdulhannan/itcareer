const steps = [
  { title: "Choose a course", body: "Pick Shopify Development or Cyber Security." },
  { title: "Pay the fee", body: "Pay by JazzCash, Easypaisa or bank transfer." },
  { title: "Send your details", body: "Fill in the form; it opens WhatsApp with your details." },
  { title: "Join the class", body: "We confirm on WhatsApp and send your class link." },
];

export function HowItWorks() {
  return (
    <section className="bg-ink-900 py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-300">How to enroll</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Four simple steps</h2>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <span className="grid size-10 place-items-center rounded-full bg-emerald-400 font-extrabold text-ink-900">{i + 1}</span>
              <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
              <p className="mt-1 text-slate-300">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

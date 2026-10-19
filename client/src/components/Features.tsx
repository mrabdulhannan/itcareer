import { SectionHeading } from "./Field";

const features = [
  { icon: "📅", title: "Weekend live classes", body: "Learn on Saturdays and Sundays without leaving your job or studies." },
  { icon: "🗣️", title: "Taught in Urdu", body: "Clear explanations in Urdu, with the English terms you'll use at work." },
  { icon: "🛠️", title: "Hands-on projects", body: "Build real stores and practise in real security labs, not just slides." },
  { icon: "🎥", title: "Class recordings", body: "Missed a class? Catch up with recordings shared after each session." },
  { icon: "🎓", title: "Certificate", body: "Earn an ITcareer.pk certificate when you complete the course and project." },
  { icon: "💼", title: "Career guidance", body: "CV tips, freelancing advice and, soon, IT job opportunities on ITcareer.pk." },
];

export function Features() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Why ITcareer.pk" title="Learn the way the industry works" center />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-2xl border border-slate-200 p-6 transition hover:border-brand-500 hover:shadow-md">
            <span className="text-3xl" aria-hidden>
              {feature.icon}
            </span>
            <h3 className="mt-4 text-lg font-bold">{feature.title}</h3>
            <p className="mt-2 text-ink-700">{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

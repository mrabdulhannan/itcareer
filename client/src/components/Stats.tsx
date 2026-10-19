import { site } from "../config/site";

export function Stats() {
  return (
    <section aria-label="ITcareer.pk in numbers" className="border-y border-slate-200 bg-white">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
        {site.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="text-3xl font-extrabold text-brand-700 sm:text-4xl">{stat.value}</dd>
            <dd className="mt-1 text-sm text-ink-500">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

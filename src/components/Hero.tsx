import { courses, site } from "../config/site";
import { ArrowIcon, CheckIcon } from "./Icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
            <span className="size-2 animate-pulse rounded-full bg-brand-500" /> Admissions open · Weekend classes
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl">
            Build a career in IT with <span className="text-brand-700">practical, job-ready skills.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-700">
            Live weekend classes in Shopify Development and Cyber Security, taught in Urdu by an industry professional who works with
            international clients.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#enroll"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-brand-700/20 hover:bg-brand-600"
            >
              Enroll now <ArrowIcon />
            </a>
            <a
              href="#courses"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 font-bold text-ink-900 ring-1 ring-slate-300 hover:ring-brand-500"
            >
              Explore courses
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink-700">
            {["Live classes on weekends", "Taught in Urdu", "Certificate of completion"].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CheckIcon className="text-brand-600" width={16} height={16} /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4">
          {courses.map((course, i) => (
            <a
              key={course.slug}
              href="#courses"
              className={`group rounded-3xl p-6 shadow-xl transition hover:-translate-y-1 sm:p-7 ${
                i === 0 ? "bg-ink-900 text-white" : "bg-white ring-1 ring-slate-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`text-xs font-bold uppercase tracking-widest ${i === 0 ? "text-emerald-300" : "text-brand-700"}`}>
                    {course.badge}
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold">{course.title}</h2>
                  <p className={`mt-2 text-sm ${i === 0 ? "text-slate-300" : "text-ink-700"}`}>
                    {course.schedule} · {course.mode}
                  </p>
                </div>
                <span
                  className={`grid size-12 shrink-0 place-items-center rounded-2xl text-xl font-black ${
                    i === 0 ? "bg-emerald-400/15 text-emerald-300" : "bg-brand-50 text-brand-700"
                  }`}
                  aria-hidden
                >
                  {i === 0 ? "{ }" : "🛡"}
                </span>
              </div>
              <p className={`mt-5 inline-flex items-center gap-1 text-sm font-bold ${i === 0 ? "text-white" : "text-brand-700"}`}>
                View course <ArrowIcon width={16} height={16} className="transition group-hover:translate-x-1" />
              </p>
            </a>
          ))}
          <p className="text-center text-sm text-ink-500">Taught by {site.instructor.name}</p>
        </div>
      </div>
    </section>
  );
}

import { courses, type CourseSlug } from "../config/site";
import { SectionHeading } from "./Field";
import { CheckIcon } from "./Icons";

export function Courses({ onEnroll }: { onEnroll: (slug: CourseSlug) => void }) {
  return (
    <section id="courses" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our courses"
          title="Two courses. Real skills. Weekend classes."
          intro="Each course is taught live, step by step, with hands-on practice so you finish with skills you can show an employer or client."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {courses.map((course) => {
            const facts = [
              { label: "Schedule", value: course.schedule },
              { label: "Format", value: course.mode },
              { label: "Language", value: course.language },
              { label: "Level", value: course.level },
              ...(course.duration ? [{ label: "Duration", value: course.duration }] : []),
              ...(course.nextBatch ? [{ label: "Next batch", value: course.nextBatch }] : []),
            ];
            return (
              <article key={course.slug} className="flex flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 sm:p-9">
                <span className="self-start rounded-full bg-brand-700 px-3 py-1 text-xs font-bold text-white">{course.badge}</span>
                <h3 className="mt-4 text-2xl font-extrabold sm:text-3xl">{course.title}</h3>
                <p className="mt-3 text-ink-700">{course.tagline}</p>

                <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 rounded-2xl bg-slate-50 p-4 text-sm">
                  {facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="text-ink-500">{fact.label}</dt>
                      <dd className="font-semibold">{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                <h4 className="mt-7 font-bold">What you'll learn</h4>
                <ol className="mt-3 space-y-2.5">
                  {course.modules.map((module, i) => (
                    <li key={module} className="flex gap-3 text-ink-700">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                        {i + 1}
                      </span>
                      {module}
                    </li>
                  ))}
                </ol>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {course.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700"
                    >
                      <CheckIcon width={14} height={14} /> {outcome}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center">
                  <p>
                    <span className="block text-sm text-ink-500">Course fee</span>
                    <span className="text-2xl font-extrabold">{course.fee ?? "Ask for fee"}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => onEnroll(course.slug)}
                    className="w-full rounded-xl bg-brand-700 px-6 py-3 font-bold text-white hover:bg-brand-600 sm:w-auto"
                  >
                    Enroll now
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

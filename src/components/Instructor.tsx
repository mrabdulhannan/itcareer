import { site } from "../config/site";

export function Instructor() {
  const { instructor } = site;
  const initials = instructor.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid items-center gap-10 rounded-3xl bg-brand-50 p-8 sm:p-12 lg:grid-cols-[auto_1fr]">
        {/* Replace with a photo: put it in client/public/instructor.jpg and use <img src="/instructor.jpg" ... /> */}
        <div
          className="mx-auto grid size-40 place-items-center rounded-full bg-brand-700 text-5xl font-extrabold text-white shadow-xl ring-8 ring-white sm:size-48"
          aria-hidden
        >
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-700">Meet your instructor</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight">{instructor.name}</h2>
          <p className="font-semibold text-ink-500">{instructor.title}</p>
          {instructor.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 20)} className="mt-4 text-ink-700">
              {paragraph}
            </p>
          ))}
          <ul className="mt-6 flex flex-wrap gap-2">
            {instructor.credentials.map((credential) => (
              <li key={credential} className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-ink-700 ring-1 ring-brand-100">
                {credential}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

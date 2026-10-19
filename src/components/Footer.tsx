import { courses, site } from "../config/site";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="bg-ink-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="text-2xl font-extrabold text-white">
            ITcareer<span className="text-emerald-400">.pk</span>
          </p>
          <p className="mt-3 max-w-sm">Practical IT courses in Urdu, and soon, a job platform made for Pakistan's IT industry.</p>
          <div className="mt-6">
            <SocialLinks tone="dark" />
          </div>
        </div>
        <nav aria-label="Courses">
          <p className="font-bold text-white">Courses</p>
          <ul className="mt-4 space-y-2">
            {courses.map((course) => (
              <li key={course.slug}>
                <a href="#courses" className="hover:text-white">
                  {course.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company">
          <p className="font-bold text-white">ITcareer.pk</p>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#jobs" className="hover:text-white">
                For companies
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm sm:px-6">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

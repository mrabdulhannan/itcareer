import { site } from "../config/site";
import { YouTubeIcon } from "./Icons";

export function YouTube() {
  return (
    <section id="youtube" className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-slate-200 p-8 text-center sm:p-10 md:flex-row md:text-left">
        <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-red-600 text-white">
          <YouTubeIcon width={32} height={32} />
        </span>
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold">Free lessons on YouTube</h2>
          <p className="mt-1 text-ink-700">Tutorials, career advice and freelancing tips in Urdu. New videos every week.</p>
        </div>
        <a
          href={`${site.social.youtube}?sub_confirmation=1`}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700"
        >
          Subscribe
        </a>
      </div>
    </section>
  );
}

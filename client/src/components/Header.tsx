import { useState } from "react";
import { site } from "../config/site";
import { CloseIcon, MenuIcon } from "./Icons";

const links = [
  { href: "#courses", label: "Courses" },
  { href: "#about", label: "About" },
  { href: "#why", label: "Why us" },
  { href: "#jobs", label: "For companies" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 text-xl font-extrabold tracking-tight" aria-label={`${site.name} home`}>
      <span className="grid size-9 place-items-center rounded-lg bg-brand-700 text-sm text-white">IT</span>
      <span>
        career<span className="text-brand-600">.pk</span>
      </span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-ink-700 hover:text-brand-700">
              {link.label}
            </a>
          ))}
          <a href="#enroll" className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-bold text-white hover:bg-brand-600">
            Enroll now
          </a>
        </nav>
        <button
          type="button"
          className="rounded-lg p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t border-slate-200 bg-white px-4 pb-4 md:hidden" aria-label="Mobile">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block py-3 font-medium text-ink-700">
              {link.label}
            </a>
          ))}
          <a
            href="#enroll"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-brand-700 px-4 py-3 text-center font-bold text-white"
          >
            Enroll now
          </a>
        </nav>
      )}
    </header>
  );
}

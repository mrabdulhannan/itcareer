import { site } from "../config/site";
import { FacebookIcon, InstagramIcon, LinkedInIcon, TikTokIcon, YouTubeIcon } from "./Icons";

const items = [
  { href: site.social.youtube, label: "YouTube", Icon: YouTubeIcon },
  { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: site.social.tiktok, label: "TikTok", Icon: TikTokIcon },
  { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
];

export function SocialLinks({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <ul className="flex gap-3">
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`ITcareer.pk on ${label}`}
            className={`grid size-11 place-items-center rounded-xl transition ${
              tone === "dark" ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 text-ink-700 hover:bg-brand-700 hover:text-white"
            }`}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}

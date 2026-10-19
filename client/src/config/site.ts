// Edit brand details, links, course info and payment details here; the page reads everything from this file.
// Values set to null are not shown on the page until you fill them in.
const handle = "officialitcareer";

export const site = {
  name: "ITcareer.pk",
  domain: "itcareer.pk",
  email: "info@itcareer.pk",
  /** International format without +, e.g. "923001234567". Also settable with VITE_WHATSAPP_NUMBER. */
  whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) || null,
  social: {
    youtube: `https://www.youtube.com/@${handle}`,
    instagram: `https://www.instagram.com/${handle}`,
    facebook: `https://www.facebook.com/${handle}`,
    tiktok: `https://www.tiktok.com/@${handle}`,
    linkedin: `https://www.linkedin.com/company/${handle}`,
  },
  instructor: {
    name: "Abdul Hannan Danish",
    title: "Founder & Lead Instructor",
    bio: [
      "I'm a software engineer (BS Software Engineering, PUCIT) with 5 years of professional experience building Shopify, Shopify Plus, Magento, WordPress and Laravel stores for brands in Germany, Switzerland, Greece and the US, including a fully remote contract with a German company.",
      "I hold the Cisco CCST Cybersecurity certification. At ITcareer.pk I teach in Urdu, the practical way: real projects, real tools, and the habits companies actually look for.",
    ],
    credentials: ["BS Software Engineering, PUCIT", "Cisco CCST Cybersecurity", "Shopify Plus developer", "Google AI Essentials"],
  },
  stats: [
    { value: "5+", label: "years of industry experience" },
    { value: "40+", label: "live stores built" },
    { value: "4", label: "countries of clients" },
    { value: "2", label: "courses with weekend classes" },
  ],
  /** Payment accounts shown in the enrolment section. Fill these in before going live. */
  payment: {
    jazzcash: { title: "JazzCash", accountName: null as string | null, accountNumber: null as string | null },
    easypaisa: { title: "Easypaisa", accountName: null as string | null, accountNumber: null as string | null },
    bankTransfer: { title: "Bank transfer", accountName: null as string | null, accountNumber: null as string | null, bank: null as string | null },
  },
} as const;

export type CourseSlug = "shopify-development" | "cyber-security";

export interface Course {
  slug: CourseSlug;
  title: string;
  tagline: string;
  badge: string;
  schedule: string;
  mode: string;
  language: string;
  level: string;
  /** e.g. "8 weeks". null hides it. */
  duration: string | null;
  /** e.g. "Rs 15,000". null shows "Ask for fee". */
  fee: string | null;
  /** e.g. "Starts 8 November 2026". null hides it. */
  nextBatch: string | null;
  modules: string[];
  outcomes: string[];
}

export const courses: Course[] = [
  {
    slug: "shopify-development",
    title: "Shopify Development",
    tagline: "Build, customise and launch professional Shopify stores, and start earning from local and international clients.",
    badge: "Weekend classes",
    schedule: "Saturday & Sunday",
    mode: "Live online classes",
    language: "Urdu / English",
    level: "Beginner to intermediate",
    duration: null,
    fee: null,
    nextBatch: null,
    modules: [
      "Shopify admin, store setup and products",
      "Liquid templating: objects, tags and filters",
      "Online Store 2.0: sections, blocks and theme settings",
      "Custom theme development from scratch",
      "Apps, integrations and store speed optimisation",
      "Client work: freelancing, pricing and delivery",
    ],
    outcomes: ["Build a complete Shopify store", "Customise any theme", "Portfolio project to show clients", "Certificate of completion"],
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    tagline: "Learn how systems are attacked and how to defend them, the foundation for SOC, IT support and security careers.",
    badge: "Weekend classes",
    schedule: "Saturday & Sunday",
    mode: "Live online classes",
    language: "Urdu / English",
    level: "Beginner",
    duration: null,
    fee: null,
    nextBatch: null,
    modules: [
      "Security fundamentals: the CIA triad, threats and risk",
      "Networking basics for security",
      "Linux and Windows security essentials",
      "Common attacks: phishing, malware, web vulnerabilities",
      "Security tools: Wireshark, Nmap and more (hands-on labs)",
      "Incident response and a roadmap to certifications",
    ],
    outcomes: ["Understand real-world threats", "Hands-on lab practice", "Prepare for entry-level certifications", "Certificate of completion"],
  },
];

export const faqs = [
  {
    q: "When are the classes?",
    a: "Both courses run as live online classes on weekends (Saturday and Sunday), so you can join alongside a job or university.",
  },
  {
    q: "Do I need any experience?",
    a: "No. Both courses start from the basics. For Shopify Development, basic HTML and CSS helps but isn't required.",
  },
  {
    q: "What language are classes in?",
    a: "Classes are taught in Urdu, with English technical terms, so concepts are easy to follow and you still learn the vocabulary used at work.",
  },
  {
    q: "How do I pay?",
    a: "Pay by JazzCash, Easypaisa or bank transfer, then fill in the enrolment form with your transaction ID. We confirm on WhatsApp and send your class details.",
  },
  {
    q: "Will I get a certificate?",
    a: "Yes. You get an ITcareer.pk certificate of completion when you finish the course and its project.",
  },
  {
    q: "What if I miss a class?",
    a: "Class recordings are shared with enrolled students so you can catch up.",
  },
];

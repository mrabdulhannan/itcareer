import { useState } from "react";
import { Contact } from "./components/Contact";
import { Courses } from "./components/Courses";
import { Employers } from "./components/Employers";
import { Enroll } from "./components/Enroll";
import { Faq } from "./components/Faq";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Instructor } from "./components/Instructor";
import { Stats } from "./components/Stats";
import { YouTube } from "./components/YouTube";
import { WhatsAppIcon } from "./components/Icons";
import type { CourseSlug } from "./config/site";
import { whatsappLink } from "./lib/send";

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState<CourseSlug | "">("");

  function enroll(slug: CourseSlug) {
    setSelectedCourse(slug);
    document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:p-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <Courses onEnroll={enroll} />
        <Features />
        <HowItWorks />
        <Instructor />
        <Enroll selectedCourse={selectedCourse} />
        <Employers />
        <YouTube />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed right-5 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105"
      >
        <WhatsAppIcon width={28} height={28} />
      </a>
    </>
  );
}

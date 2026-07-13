import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomCursor } from "@/components/CustomCursor";
import { NodeField } from "@/components/NodeField";
import { TagCloud3D } from "@/components/TagCloud3D";
import { BentoProjects } from "@/components/BentoProjects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AKSHAY GEDAM — Full-Stack Developer & Software Engineer" },
      {
        name: "description",
        content:
          "Akshay Gedam — Software Engineer & Full-Stack Developer, India. Specialized in Node.js, MERN stack, secure JWT/RBAC architectures, and enterprise business process automation systems like Sanvid.",
      },
      { property: "og:title", content: "AKSHAY GEDAM — Full-Stack Developer" },
      {
        property: "og:description",
        content: "Software Engineer & Full-Stack Developer. Specialized in secure APIs, MERN stack & real-time systems.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;900&display=swap",
      },
    ],
  }),
  component: Index,
});

const marqueeItems = [
  "TYPESCRIPT",
  "NODE.JS",
  "SOCKET.IO & SSE",
  "POSTGRES · MONGO · MYSQL",
  "OPEN TO WORK",
];

function Index() {
  const root = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<"intro" | "work" | "skills" | "journey" | "contact" | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-line]", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
        delay: 0.1,
      });

      // Scroll spy triggers
      ScrollTrigger.create({
        trigger: "#intro",
        start: "top 30%",
        end: "bottom 30%",
        onEnter: () => setActiveSection("intro"),
        onEnterBack: () => setActiveSection("intro"),
        onLeaveBack: () => setActiveSection(null),
      });

      ScrollTrigger.create({
        trigger: "#work",
        start: "top 30%",
        end: "bottom 30%",
        onEnter: () => setActiveSection("work"),
        onEnterBack: () => setActiveSection("work"),
        onLeaveBack: () => setActiveSection("intro"),
      });

      ScrollTrigger.create({
        trigger: "#skills",
        start: "top 30%",
        end: "bottom 30%",
        onEnter: () => setActiveSection("skills"),
        onEnterBack: () => setActiveSection("skills"),
        onLeaveBack: () => setActiveSection("work"),
      });

      ScrollTrigger.create({
        trigger: "#journey",
        start: "top 30%",
        end: "bottom 30%",
        onEnter: () => setActiveSection("journey"),
        onEnterBack: () => setActiveSection("journey"),
        onLeaveBack: () => setActiveSection("skills"),
      });

      ScrollTrigger.create({
        trigger: "#contact",
        start: "top 85%",
        end: "bottom bottom",
        onEnter: () => setActiveSection("contact"),
        onEnterBack: () => setActiveSection("contact"),
        onLeaveBack: () => setActiveSection("journey"),
      });

      gsap.from("[data-hero-meta]", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.8,
      });
      gsap.utils.toArray<HTMLElement>("[data-slide]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 80,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-section-label]").forEach((el) => {
        gsap.from(el, {
          xPercent: -30,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-screen text-foreground overflow-x-hidden">
      <CustomCursor />

      {/* NAV */}
      <header
        className="fixed top-0 inset-x-0 z-50 flex justify-between items-center px-6 md:px-10 py-4 transition-all duration-300 backdrop-blur-md"
        style={{
          backgroundColor: activeSection === "contact" ? "rgba(10, 10, 10, 0.7)" : "rgba(245, 240, 232, 0.7)",
          color: activeSection === "contact" ? "var(--orange)" : "black",
          borderBottom: activeSection === "contact" ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)"
        }}
      >
        <a
          href="#top"
          className={`font-black text-lg tracking-tight transition-colors duration-300 ${activeSection === "contact" ? "text-white" : "text-black"
            }`}
        >
          A.G ⏶
        </a>
        <nav className="flex gap-3 md:gap-7 text-xs font-black uppercase tracking-widest">
          <a
            href="#intro"
            className={`transition-colors duration-300 ${activeSection === "intro"
              ? "text-[var(--orange)]"
              : activeSection === "contact"
                ? "text-white/60 hover:text-white"
                : "text-black/60 hover:text-black"
              }`}
          >
            Intro
          </a>
          <a
            href="#work"
            className={`transition-colors duration-300 ${activeSection === "work"
              ? "text-[var(--orange)]"
              : activeSection === "contact"
                ? "text-white/60 hover:text-white"
                : "text-black/60 hover:text-black"
              }`}
          >
            Work
          </a>
          <a
            href="#skills"
            className={`transition-colors duration-300 ${activeSection === "skills"
              ? "text-[var(--orange)]"
              : activeSection === "contact"
                ? "text-white/60 hover:text-white"
                : "text-black/60 hover:text-black"
              }`}
          >
            Stack
          </a>
          <a
            href="#journey"
            className={`transition-colors duration-300 ${activeSection === "journey"
              ? "text-[var(--orange)]"
              : activeSection === "contact"
                ? "text-white/60 hover:text-white"
                : "text-black/60 hover:text-black"
              }`}
          >
            Journey
          </a>
          <a
            href="#contact"
            className={`transition-colors duration-300 ${activeSection === "contact"
              ? "text-[var(--orange)]"
              : "text-black/60 hover:text-black"
              }`}
          >
            Contact
          </a>
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-block bg-[var(--orange)] text-white px-4 py-2 border-2 transition-all duration-300 font-black text-xs uppercase tracking-widest"
          style={activeSection === "contact"
            ? { borderColor: "#fff", boxShadow: "4px 4px 0 0 #fff" }
            : { borderColor: "var(--ink)", boxShadow: "4px 4px 0 0 var(--ink)" }
          }
        >
          Hire Me →
        </a>
      </header>

      {/* HERO */}
      <section id="top" className="relative h-screen min-h-[680px] flex flex-col justify-center overflow-hidden">
        <NodeField />
        <div className="relative px-4 md:px-8 z-10">
          <h1 className="font-black tracking-[-0.06em] leading-[0.82] text-[22vw] md:text-[18vw] lg:text-[15rem] text-center select-none">
            <span className="block overflow-hidden">
              <span data-hero-line className="block">AKSHAY</span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                <span className="text-[var(--orange)]">.</span>GEDAM
              </span>
            </span>
          </h1>
        </div>
        <div data-hero-meta className="absolute bottom-10 inset-x-0 px-6 md:px-10 flex justify-between items-end z-10">
          <div className="max-w-xs text-sm font-bold leading-tight">
            SOFTWARE ENGINEER<br />
            <span className="font-medium opacity-70">I engineer secure, high-performance backends and scalable full-stack systems — from real-time apps to enterprise automation.</span>
          </div>
          <div className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--orange)] rounded-full animate-pulse" />
            Scroll
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y-2 border-black py-6 overflow-hidden bg-black text-[var(--background)] flex flex-col gap-4">
        {/* Row 1: Left to Right */}
        <div className="flex whitespace-nowrap animate-marquee-right">
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={`r1-${i}`} className="text-3xl md:text-5xl font-black px-8 flex items-center gap-8 select-none">
              {t}
              <span className="text-[var(--orange)]">✦</span>
            </span>
          ))}
        </div>
        {/* Subtle divider line between the marquee rows */}
        {/* Row 2: Right to Left */}
        {/* <div className="flex whitespace-nowrap animate-marquee-left">
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={`r2-${i}`} className="text-3xl md:text-5xl font-black px-8 flex items-center gap-8 select-none">
              {t}
              <span className="text-[var(--orange)]">✦</span>
            </span>
          ))}
        </div> */}
      </section>

      {/* ABOUT / INTRO */}
      <section id="intro" className="px-6 md:px-10 py-28 md:py-40 max-w-6xl mx-auto">
        <div data-section-label className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-3">
          <span className="w-8 h-[2px] bg-black" /> 001 / INTRO
        </div>
        <h2 data-slide className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
          I architect <span className="bg-[var(--green)] px-3">backends</span>,<br />
          design secure <span className="bg-[var(--blue)] text-white px-3">permission systems</span>,<br />
          and ship <span className="bg-[var(--orange)] text-white px-3">workflows</span><br />
          enterprises actually trust.
        </h2>
      </section>

      {/* <section className="px-6 md:px-10 py-28 md:py-40 max-w-6xl mx-auto">
        <div data-section-label className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-3">
          <span className="w-8 h-[2px] bg-black" /> 001 / INTRO
        </div>
        <h2 data-slide className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
          I build scalable <span className="bg-[var(--green)] px-2">MERN apps</span>,<br />
          design secure <span className="bg-[var(--blue)] text-white px-2">APIs & RBAC</span>,<br />
          and optimize <span className="bg-[var(--orange)] text-white px-2">query performance</span><br />
          for modern web systems.
        </h2>
      </section> */}

      {/* WORK */}
      <section id="work" className="px-6 md:px-10 py-20 md:py-28 max-w-7xl mx-auto">
        <div data-section-label className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-3">
          <span className="w-8 h-[2px] bg-black" /> 002 / SELECTED WORK
        </div>
        <h2 data-slide className="text-5xl md:text-7xl font-black mb-12 tracking-tight">
          Production work.<br />Real-world impact.
        </h2>
        <div data-slide>
          <BentoProjects />
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="px-6 md:px-10 py-20 md:py-28 max-w-7xl mx-auto">
        <div data-section-label className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-3">
          <span className="w-8 h-[2px] bg-black" /> 003 / STACK
        </div>
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 items-start">
          <div>
            <h2 data-slide className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              Tools I reach<br />for daily.
            </h2>
            <p data-slide className="text-base font-medium max-w-sm opacity-80">
              Hover or drag the cloud. Click any node to see details of how I utilize the technology in my engineering workflow.
            </p>
          </div>
          <div data-slide>
            <TagCloud3D />
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="journey" className="px-6 md:px-10 py-20 md:py-28 max-w-6xl mx-auto">
        <div data-section-label className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-3">
          <span className="w-8 h-[2px] bg-black" /> 004 / JOURNEY
        </div>
        <h2 data-slide className="text-5xl md:text-7xl font-black mb-12 tracking-tight">
          The receipts.
        </h2>
        <div className="space-y-0">
          {[
            { y: "2025 — PRESENT", t: "Software Engineer", w: "Cluematrix Technologies Pvt. LTD · Software Engineer", c: "var(--orange)" },
          ].map((r) => (
            <div data-slide key={r.t} className="grid grid-cols-[120px_1fr_auto] md:grid-cols-[180px_1fr_auto] gap-4 md:gap-8 py-6 border-t-2 border-black items-center">
              <div className="text-xs md:text-sm font-black uppercase tracking-widest">{r.y}</div>
              <div>
                <div className="text-2xl md:text-4xl font-black tracking-tight">{r.t}</div>
                <div className="text-sm font-medium opacity-70 mt-1">{r.w}</div>
              </div>
              <div className="w-6 h-6 md:w-8 md:h-8 brutal-border" style={{ background: r.c }} />
            </div>
          ))}
          <div className="border-t-2 border-black" />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 md:px-10 min-h-screen bg-black text-[var(--background)] relative overflow-hidden flex flex-col justify-center py-24">
        <div className="w-full max-w-7xl mx-auto">
          <div data-section-label className="text-xs font-black uppercase tracking-widest mb-10 flex items-center gap-3 text-[var(--orange)]">
            <span className="w-8 h-[2px] bg-[var(--orange)]" /> 005 / CONTACT
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 lg:gap-16 items-end w-full">
            <div>
              <h2 data-slide className="text-[12vw] md:text-[9vw] lg:text-[8vw] xl:text-[8.5vw] font-black leading-[0.85] tracking-[-0.04em]">
                Let's Build<br />
                <span className="text-[var(--orange)]">Scalable</span><br />
                Systems<br />
                Together.
              </h2>
            </div>
            <div data-slide className="flex flex-col gap-8">
              <div>
                <a
                  href="mailto:gedamakshay150@gmail.com"
                  className="block text-lg sm:text-xl md:text-2xl lg:text-[1.4rem] xl:text-[1.8rem] 2xl:text-[2.2rem] font-black underline decoration-[var(--orange)] decoration-[3px] md:decoration-[4px] underline-offset-8 hover:text-[var(--orange)] transition-colors break-all mb-4"
                >
                  gedamakshay150@gmail.com →
                </a>
                <div className="text-lg md:text-xl font-bold text-white/80">
                  📞 +91 9156073686
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { l: "LINKEDIN", h: "https://www.linkedin.com/in/akshay-gedam" },
                  { l: "GITHUB", h: "https://github.com/AkshayG079" },
                  { l: "RESUME", h: "#" },
                ].map((s) => (
                  <a 
                    key={s.l} 
                    href={s.h} 
                    target={s.h !== "#" ? "_blank" : undefined} 
                    rel="noreferrer" 
                    className="bg-[var(--orange)] text-white px-5 py-3 font-black text-xs uppercase tracking-widest brutal-border hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#fff] transition-all cursor-none" 
                    style={{ borderColor: "#fff" }}
                  >
                    {s.l} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <footer className="border-t-2 border-black px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs font-black uppercase tracking-widest">
        <div>© {new Date().getFullYear()} AKSHAY GEDAM · NAGPUR, IN</div>
        <div>BUILT WITH REACT · THREE.JS · GSAP</div>
      </footer> */}
    </div>
  );
}

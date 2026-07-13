import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const links = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#journey", label: "journey" },
  { href: "#contact", label: "contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "py-3 backdrop-blur-xl bg-background/70 border-b border-border/60" : "py-5"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="font-mono text-sm md:text-base text-foreground">
          <span className="text-[var(--cyan)]">~/</span>
          <span>akshay</span>
          <span className="text-[var(--purple-glow)]">.dev</span>
        </Link>
        <ul className="hidden md:flex items-center gap-7 font-mono text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-muted-foreground hover:text-[var(--cyan)] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="font-mono text-xs md:text-sm px-3 py-1.5 rounded-md border border-[var(--purple)]/60 text-[var(--purple-glow)] hover:bg-[var(--purple)]/20 transition-colors"
        >
          hire_me()
        </a>
      </nav>
    </header>
  );
}

const items = [
  {
    year: "2024 — Present",
    title: "Senior Full-Stack Engineer",
    place: "Independent / Contract",
    detail: "Building enterprise workflow systems, RBAC platforms and Node.js architectures for global clients.",
  },
  {
    year: "2022 — 2024",
    title: "Full-Stack Developer",
    place: "Product Studios, Remote",
    detail: "Led backend architecture for SaaS products in mobility and energy verticals.",
  },
  {
    year: "2020 — 2022",
    title: "B.E. Computer Science",
    place: "RTM Nagpur University",
    detail: "Graduated with distinction. Focus on distributed systems and database internals.",
  },
  {
    year: "2018 — 2020",
    title: "Diploma, Computer Engineering",
    place: "Government Polytechnic, Nagpur",
    detail: "First exposure to systems programming, networking and the open-source ecosystem.",
  },
];

export function Timeline() {
  return (
    <ol className="relative border-l border-border/70 ml-3 md:ml-6 space-y-10">
      {items.map((it, i) => (
        <li key={i} className="pl-8 md:pl-10 relative">
          <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-[var(--cyan)] timeline-dot animate-pulse-glow" />
          <div className="font-mono text-xs text-[var(--cyan)] mb-1">{it.year}</div>
          <h3 className="font-mono text-lg md:text-xl text-foreground">{it.title}</h3>
          <div className="text-sm text-muted-foreground mb-2 font-mono">{it.place}</div>
          <p className="text-foreground/85 leading-relaxed max-w-2xl">{it.detail}</p>
        </li>
      ))}
    </ol>
  );
}

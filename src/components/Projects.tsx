import { ArchDiagram } from "./ArchDiagram";

const projects = [
  {
    name: "Cluematrix MERN Suite",
    tag: "Scalable MERN Enterprise Apps",
    desc: "Contributed to design & development of scalable full-stack applications using the MERN stack. Implemented secure JWT authorization, optimized slow database queries, and tuned API latency for enterprise clients.",
    stack: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    arch: [
      [{ label: "React Client", color: "cyan" as const }],
      [{ label: "Express API Gateway", color: "purple" as const }],
      [{ label: "JWT Auth / Controllers", color: "purple" as const }],
      [{ label: "MongoDB Store", color: "amber" as const }],
    ],
  },
  {
    name: "EventStream Hub",
    tag: "Real-time communication & SSE",
    desc: "Built high-throughput Socket.io websocket servers and Server-Sent Events (SSE) pipelines for instant notifications and live updates. Utilized Redis for horizontal scale and message caching.",
    stack: ["Socket.io", "SSE", "Node.js", "Express", "Redis"],
    arch: [
      [{ label: "React Dashboard", color: "cyan" as const }],
      [{ label: "Socket.io WS", color: "purple" as const }, { label: "SSE Streamer", color: "purple" as const }],
      [{ label: "Redis Pub/Sub", color: "amber" as const }],
    ],
  },
  {
    name: "Sanvid BPM",
    tag: "Enterprise Business Automation",
    desc: "Designed and developed business process automation (CRM/ERP) workflow engine with multi-level project hierarchies, RBAC-based security, automated milestone tracking, and audit logging.",
    stack: ["Node.js", "Express", "MySQL", "SSE", "RBAC"],
    arch: [
      [{ label: "React Portal", color: "cyan" as const }],
      [{ label: "Workflow Engine", color: "purple" as const }, { label: "RBAC Service", color: "purple" as const }],
      [{ label: "MySQL DB", color: "amber" as const }, { label: "Audit Logs", color: "amber" as const }],
    ],
  },
];

export function Projects() {
  return (
    <div className="grid gap-8 md:gap-10">
      {projects.map((p) => (
        <article key={p.name} className="glass-card rounded-2xl p-6 md:p-8 grid md:grid-cols-[1fr_1.2fr] gap-8 items-start hover:border-[var(--purple)]/40 transition-colors">
          <div>
            <ArchDiagram boxes={p.arch} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-[var(--cyan)]">// project</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-mono text-glow-purple mb-1">{p.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 font-mono">{p.tag}</p>
            <p className="text-foreground/90 leading-relaxed mb-5">{p.desc}</p>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-md font-mono text-xs border border-border/80 bg-background/50 text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

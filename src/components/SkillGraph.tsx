import { useEffect, useRef, useState } from "react";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  category: "frontend" | "backend" | "database";
};

const nodes: Node[] = [
  { id: "react", label: "React", x: 120, y: 80, category: "frontend" },
  { id: "next", label: "Next.js", x: 60, y: 180, category: "frontend" },
  { id: "ts", label: "TypeScript", x: 180, y: 260, category: "frontend" },
  { id: "tw", label: "Tailwind", x: 80, y: 340, category: "frontend" },
  { id: "node", label: "Node.js", x: 360, y: 120, category: "backend" },
  { id: "express", label: "Express", x: 460, y: 60, category: "backend" },
  { id: "nest", label: "NestJS", x: 480, y: 220, category: "backend" },
  { id: "rbac", label: "RBAC", x: 360, y: 320, category: "backend" },
  { id: "rest", label: "REST", x: 540, y: 340, category: "backend" },
  { id: "pg", label: "Postgres", x: 700, y: 100, category: "database" },
  { id: "mongo", label: "MongoDB", x: 740, y: 240, category: "database" },
  { id: "redis", label: "Redis", x: 640, y: 360, category: "database" },
];

const edges: [string, string][] = [
  ["react", "next"], ["next", "ts"], ["ts", "tw"], ["react", "ts"],
  ["next", "node"], ["ts", "nest"],
  ["node", "express"], ["node", "nest"], ["nest", "rbac"], ["express", "rest"],
  ["node", "pg"], ["nest", "pg"], ["node", "mongo"], ["express", "redis"], ["nest", "mongo"],
];

const colorMap = {
  frontend: "var(--cyan)",
  backend: "var(--purple)",
  database: "var(--amber)",
};

export function SkillGraph() {
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<SVGSVGElement>(null);

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="glass-card rounded-2xl p-4 md:p-8 overflow-x-auto">
      <svg
        ref={ref}
        viewBox="0 0 820 420"
        className="w-full h-auto min-w-[600px]"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {edges.map(([a, b], i) => {
          const na = nodeMap[a], nb = nodeMap[b];
          const active = hovered === a || hovered === b;
          return (
            <line
              key={i}
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke={active ? "var(--cyan-glow)" : "oklch(1 0 0 / 0.12)"}
              strokeWidth={active ? 2 : 1}
              style={{ transition: "all 0.3s" }}
            />
          );
        })}
        {nodes.map((n) => {
          const c = colorMap[n.category];
          const active = hovered === n.id;
          return (
            <g
              key={n.id}
              transform={`translate(${n.x},${n.y})`}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <circle r={active ? 28 : 24} fill={c} opacity={0.15} filter="url(#glow)" />
              <circle r={active ? 18 : 14} fill={c} filter="url(#glow)" style={{ transition: "all 0.3s" }} />
              <circle r={6} fill="var(--background)" />
              <text
                y={active ? 44 : 40}
                textAnchor="middle"
                className="font-mono"
                fontSize="12"
                fill="oklch(0.96 0.01 250)"
                style={{ transition: "all 0.3s" }}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap gap-6 mt-6 justify-center font-mono text-xs">
        <Legend color="var(--cyan)" label="Frontend" />
        <Legend color="var(--purple)" label="Backend" />
        <Legend color="var(--amber)" label="Database" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full" style={{ background: color, boxShadow: `0 0 12px ${color}` }} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

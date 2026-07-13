import { useEffect, useState } from "react";

type NodeDef = {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  color: "cyan" | "purple" | "amber" | "center";
};

const colorMap: Record<string, string> = {
  cyan: "var(--cyan)",
  purple: "var(--purple)",
  amber: "var(--amber)",
  center: "var(--purple-glow)",
};

// viewBox 1000 x 560
const nodes: NodeDef[] = [
  { id: "client", label: "Client", sub: "browser", x: 90, y: 280, color: "cyan" },
  { id: "express", label: "Express", sub: "api gateway", x: 360, y: 130, color: "purple" },
  { id: "mysql", label: "MySQL", sub: "primary store", x: 740, y: 130, color: "amber" },
  { id: "redis", label: "Redis", sub: "cache layer", x: 740, y: 430, color: "amber" },
  { id: "worker", label: "Worker", sub: "bullmq jobs", x: 360, y: 430, color: "purple" },
  { id: "me", label: "akshay()", sub: "orchestrator", x: 540, y: 280, color: "center" },
];

const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

// edges (directed) - traffic flows along these
const edges: { from: string; to: string; id: string }[] = [
  { from: "client", to: "me", id: "c-me" },
  { from: "me", to: "express", id: "me-ex" },
  { from: "express", to: "mysql", id: "ex-my" },
  { from: "express", to: "redis", id: "ex-rd" },
  { from: "me", to: "worker", id: "me-wk" },
  { from: "worker", to: "redis", id: "wk-rd" },
  { from: "mysql", to: "me", id: "my-me" },
  { from: "redis", to: "me", id: "rd-me" },
  { from: "me", to: "client", id: "me-c" },
];

type Packet = {
  key: number;
  edgeId: string;
  method: "GET" | "POST" | "SQL" | "200" | "SET" | "JOB";
  color: string;
  duration: number;
  delay: number;
};

const methods: { m: Packet["method"]; color: string; weight: number }[] = [
  { m: "GET", color: "var(--cyan)", weight: 3 },
  { m: "POST", color: "var(--purple-glow)", weight: 2 },
  { m: "SQL", color: "var(--amber)", weight: 2 },
  { m: "200", color: "var(--cyan-glow)", weight: 2 },
  { m: "SET", color: "var(--amber)", weight: 1 },
  { m: "JOB", color: "var(--purple)", weight: 1 },
];

function pickMethod() {
  const total = methods.reduce((s, m) => s + m.weight, 0);
  let r = Math.random() * total;
  for (const m of methods) {
    if ((r -= m.weight) <= 0) return m;
  }
  return methods[0];
}

export function RequestVisualizer() {
  const [packets, setPackets] = useState<Packet[]>([]);

  useEffect(() => {
    let key = 0;
    let cancelled = false;

    const spawn = () => {
      if (cancelled) return;
      const batch: Packet[] = [];
      const count = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const edge = edges[Math.floor(Math.random() * edges.length)];
        const m = pickMethod();
        batch.push({
          key: key++,
          edgeId: edge.id,
          method: m.m,
          color: m.color,
          duration: 1.6 + Math.random() * 1.4,
          delay: Math.random() * 0.4,
        });
      }
      setPackets((prev) => [...prev.slice(-24), ...batch]);
      setTimeout(spawn, 450 + Math.random() * 500);
    };

    const t = setTimeout(spawn, 300);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 1000 560"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-90"
      >
        <defs>
          <filter id="rv-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="rv-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {edges.map((e) => {
            const a = nodeMap[e.from];
            const b = nodeMap[e.to];
            return (
              <path
                key={e.id}
                id={`path-${e.id}`}
                d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
              />
            );
          })}
        </defs>

        {/* edges */}
        {edges.map((e) => (
          <use
            key={e.id}
            href={`#path-${e.id}`}
            stroke="oklch(0.74 0.15 210 / 0.15)"
            strokeWidth={1}
            strokeDasharray="3 5"
            fill="none"
          />
        ))}

        {/* nodes */}
        {nodes.map((n) => {
          const c = colorMap[n.color];
          const isCenter = n.id === "me";
          const r = isCenter ? 46 : 32;
          return (
            <g key={n.id} transform={`translate(${n.x},${n.y})`}>
              <circle r={r + 14} fill={c} opacity={0.08} />
              <circle
                r={r}
                fill="oklch(0.16 0.03 265 / 0.85)"
                stroke={c}
                strokeWidth={isCenter ? 2 : 1.2}
                filter="url(#rv-glow)"
              >
                {isCenter && (
                  <animate
                    attributeName="r"
                    values={`${r};${r + 3};${r}`}
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>
              <text
                textAnchor="middle"
                y={isCenter ? -2 : -2}
                fontSize={isCenter ? 14 : 12}
                fontFamily="JetBrains Mono, monospace"
                fontWeight={600}
                fill={c}
              >
                {n.label}
              </text>
              <text
                textAnchor="middle"
                y={isCenter ? 14 : 12}
                fontSize={9}
                fontFamily="JetBrains Mono, monospace"
                fill="oklch(0.7 0.03 260)"
              >
                {n.sub}
              </text>
            </g>
          );
        })}

        {/* packets */}
        {packets.map((p) => (
          <g key={p.key} filter="url(#rv-glow-strong)">
            <circle r={4} fill={p.color}>
              <animateMotion
                dur={`${p.duration}s`}
                begin={`${p.delay}s`}
                repeatCount="1"
                fill="freeze"
                rotate="auto"
              >
                <mpath href={`#path-${p.edgeId}`} />
              </animateMotion>
            </circle>
            <g fontFamily="JetBrains Mono, monospace" fontSize={9} fill={p.color}>
              <rect
                x={6}
                y={-8}
                width={p.method.length * 6.5 + 8}
                height={14}
                rx={3}
                fill="oklch(0.16 0.03 265 / 0.85)"
                stroke={p.color}
                strokeWidth={0.7}
              >
                <animateMotion
                  dur={`${p.duration}s`}
                  begin={`${p.delay}s`}
                  repeatCount="1"
                  fill="freeze"
                >
                  <mpath href={`#path-${p.edgeId}`} />
                </animateMotion>
              </rect>
              <text x={10} y={2}>
                {p.method}
                <animateMotion
                  dur={`${p.duration}s`}
                  begin={`${p.delay}s`}
                  repeatCount="1"
                  fill="freeze"
                >
                  <mpath href={`#path-${p.edgeId}`} />
                </animateMotion>
              </text>
            </g>
          </g>
        ))}
      </svg>

      {/* fade overlays so hero text reads cleanly */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, oklch(0.16 0.03 265 / 0.55) 55%, oklch(0.16 0.03 265 / 0.85) 100%)",
        }}
      />
    </div>
  );
}

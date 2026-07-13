type Box = { label: string; color: "cyan" | "purple" | "amber" };

const colorMap = {
  cyan: "var(--cyan)",
  purple: "var(--purple)",
  amber: "var(--amber)",
};

export function ArchDiagram({ boxes }: { boxes: Box[][] }) {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg bg-background/40 border border-border/60 font-mono text-xs">
      {boxes.map((row, ri) => (
        <div key={ri} className="flex flex-col items-center gap-1">
          <div className="flex flex-wrap gap-2 justify-center">
            {row.map((b, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded border"
                style={{
                  borderColor: colorMap[b.color],
                  color: colorMap[b.color],
                  background: `color-mix(in oklab, ${colorMap[b.color]} 12%, transparent)`,
                }}
              >
                {b.label}
              </div>
            ))}
          </div>
          {ri < boxes.length - 1 && (
            <svg width="20" height="16" className="opacity-50">
              <line x1="10" y1="0" x2="10" y2="12" stroke="var(--cyan)" strokeWidth="1" />
              <polygon points="10,16 6,10 14,10" fill="var(--cyan)" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

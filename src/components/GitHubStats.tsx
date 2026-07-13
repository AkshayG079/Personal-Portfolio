const stats = [
  { label: "Repositories", value: "84" },
  { label: "Contributions (1y)", value: "1.2k" },
  { label: "Stars earned", value: "320" },
  { label: "Followers", value: "210" },
];

export function GitHubStats() {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-mono text-xs text-[var(--cyan)] mb-1">// github</div>
          <h3 className="font-mono text-xl text-foreground">@akshaygedam</h3>
        </div>
        <a
          href="https://github.com"
          className="font-mono text-sm text-[var(--purple-glow)] hover:text-[var(--cyan)] transition-colors"
        >
          github.com →
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border/70 bg-background/40 p-4"
          >
            <div className="font-mono text-2xl text-glow-cyan text-[var(--cyan)]">{s.value}</div>
            <div className="font-mono text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <div className="font-mono text-xs text-muted-foreground mb-2">contribution heatmap</div>
        <div className="grid grid-cols-[repeat(40,minmax(0,1fr))] gap-[3px]">
          {Array.from({ length: 40 * 7 }).map((_, i) => {
            const seed = (i * 37) % 100;
            const intensity = seed < 30 ? 0.08 : seed < 55 ? 0.25 : seed < 80 ? 0.55 : 0.9;
            return (
              <span
                key={i}
                className="aspect-square rounded-[2px]"
                style={{ background: `color-mix(in oklab, var(--cyan) ${intensity * 100}%, transparent)` }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

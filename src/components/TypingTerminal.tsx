import { useEffect, useState } from "react";

const phrases = [
  "Node.js architect",
  "RBAC systems builder",
  "Enterprise workflow engineer",
];

export function TypingTerminal() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    const speed = deleting ? 40 : 80;

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), 1600);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
      return;
    }
    const t = setTimeout(() => {
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, phraseIdx]);

  return (
    <div className="glass-card rounded-xl overflow-hidden max-w-2xl w-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/40">
        <span className="w-3 h-3 rounded-full bg-destructive/80" />
        <span className="w-3 h-3 rounded-full bg-amber/80" style={{ background: "var(--amber)" }} />
        <span className="w-3 h-3 rounded-full bg-cyan/80" style={{ background: "var(--cyan)" }} />
        <span className="ml-3 text-xs font-mono text-muted-foreground">~/akshay — zsh</span>
      </div>
      <div className="p-6 font-mono text-sm md:text-base leading-relaxed">
        <div className="text-muted-foreground">
          <span className="text-[var(--cyan)]">akshay</span>
          <span>@</span>
          <span className="text-[var(--purple-glow)]">nagpur</span>
          <span>:~$ </span>
          <span className="text-foreground">whoami</span>
        </div>
        <div className="text-foreground mt-1">Akshay Gedam</div>
        <div className="text-muted-foreground mt-3">
          <span className="text-[var(--cyan)]">akshay</span>
          <span>@</span>
          <span className="text-[var(--purple-glow)]">nagpur</span>
          <span>:~$ </span>
          <span className="text-foreground">cat role.txt</span>
        </div>
        <div className="mt-1 min-h-[1.5em] text-foreground terminal-cursor">
          <span className="text-[var(--cyan)]">{text}</span>
        </div>
      </div>
    </div>
  );
}

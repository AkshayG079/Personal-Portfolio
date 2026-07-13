import { useState } from "react";

type Project = {
  name: string;
  tag: string;
  desc: string;
  stack: string[];
  color: string;
  textOn: string;
  span: string;
  mock: "result" | "resume" | "tictactoe";
  github?: string;
  live?: string;
};

const projects: Project[] = [
  {
    name: "Result Management System",
    tag: "MERN Stack Application",
    desc: "A full-stack student database and grading portal. Supports admin portals for records creation, score inputs, automated GPA calculators and secure student grade views.",
    stack: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    color: "#2ecc71",
    textOn: "#0a0a0a",
    span: "md:col-span-2 md:row-span-2",
    mock: "result",
    github: "https://github.com/AkshayG079/Result-Management-System-MERN.git",
    live: "https://github.com/AkshayG079/Result-Management-System-MERN.git",
  },
  {
    name: "AI Resume Builder & ATS Scanner",
    tag: "AI-Powered Full Stack Tool",
    desc: "A resume builder with professional templates, real-time editing, PDF export, and AI-powered ATS scoring with resume feedback.",
    stack: ["React", "Express", "Node.js", "Gemini API", "jsPDF", "MUI", "Tailwind"],
    color: "#2a7fff",
    textOn: "#ffffff",
    span: "md:col-span-2",
    mock: "resume",
    github: "https://github.com/AkshayG079/Resume-Builder.git",
    live: "https://akshayg079.github.io/Resume-Builder/",
  },
  {
    name: "Tic Tac Toe",
    tag: "Interactive Game",
    desc: "A clean and engaging classic Tic-Tac-Toe browser game. Built with smooth motion transitions, simple responsive layouts and a smart bot opponent.",
    stack: ["HTML5", "CSS3", "JAVASCRIPT"],
    color: "#ff6b00",
    textOn: "#0a0a0a",
    span: "md:col-span-2",
    mock: "tictactoe",
    github: "https://github.com/AkshayG079/Tic-Tac-Toe-Game.git",
    live: "https://akshayg079.github.io/Tic-Tac-Toe-Game/",
  },
];

function ResultManagementMock() {
  const [mathScore, setMathScore] = useState(85);
  const [scienceScore, setScienceScore] = useState(90);
  const [englishScore, setEnglishScore] = useState(78);

  const average = Math.round((mathScore + scienceScore + englishScore) / 3);

  return (
    <div className="bg-white brutal-border p-3 w-full h-full text-black flex flex-col justify-between text-left">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-black uppercase">RESULT PORTAL</div>
          <div className="text-[9px] font-black bg-[#2ecc71] px-1.5 py-0.5 border border-black shadow-[1px_1px_0_0_#000]">
            AVG: {average}%
          </div>
        </div>
        <div className="space-y-1.5">
          {[
            { label: "Math", val: mathScore, set: setMathScore },
            { label: "Science", val: scienceScore, set: setScienceScore },
            { label: "English", val: englishScore, set: setEnglishScore },
          ].map(subj => (
            <div key={subj.label} className="flex justify-between items-center brutal-border p-1 text-[8px] font-bold">
              <span>{subj.label}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => subj.set(Math.max(0, subj.val - 5))}
                  className="w-3.5 h-3.5 flex items-center justify-center border border-black bg-neutral-100 hover:bg-neutral-200 font-bold active:translate-y-0.5 cursor-pointer"
                >
                  -
                </button>
                <span className="w-5 text-center">{subj.val}</span>
                <button
                  onClick={() => subj.set(Math.min(100, subj.val + 5))}
                  className="w-3.5 h-3.5 flex items-center justify-center border border-black bg-neutral-100 hover:bg-neutral-200 font-bold active:translate-y-0.5 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-[7px] text-neutral-500 font-bold flex justify-between items-center mt-2">
        <span>STATUS: 200 OK</span>
        <span className="text-[#2ecc71] font-black">DB CONNECTED</span>
      </div>
    </div>
  );
}

function ResumeBuilderMock() {
  const [name, setName] = useState("Akshay Gedam");
  const [role, setRole] = useState("Software Engineer");
  const [themeColor, setThemeColor] = useState("#2a7fff");

  return (
    <div className="bg-white brutal-border p-3 w-full h-full text-black flex flex-col justify-between text-left">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-black uppercase">RESUME PREVIEW</div>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full cursor-pointer border border-black bg-[#ff6b00]" onClick={() => setThemeColor("#ff6b00")} />
            <span className="w-2.5 h-2.5 rounded-full cursor-pointer border border-black bg-[#2a7fff]" onClick={() => setThemeColor("#2a7fff")} />
            <span className="w-2.5 h-2.5 rounded-full cursor-pointer border border-black bg-[#2ecc71]" onClick={() => setThemeColor("#2ecc71")} />
          </div>
        </div>
        <div className="brutal-border p-2 bg-neutral-50 space-y-1.5 text-[8px] font-medium leading-none">
          <div className="flex items-center gap-1.5 border-b border-neutral-300 pb-1">
            <div className="w-4 h-4 rounded-full bg-neutral-300 flex-shrink-0" />
            <div>
              <div className="font-bold text-[9px] uppercase tracking-tight" style={{ color: themeColor }}>{name}</div>
              <div className="text-[7px] text-neutral-500">{role}</div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-[7px]" style={{ color: themeColor }}>EXPERIENCE</div>
            <div className="text-[6px] font-bold text-neutral-700">MERN Developer · Acme Corp</div>
          </div>
        </div>
      </div>
      <div className="flex gap-1.5 mt-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-1/2 text-[8px] px-1 py-0.5 border border-black bg-white rounded-none outline-none font-bold"
        />
        <button className="w-1/2 text-[8px] font-black uppercase border border-black bg-black text-white py-0.5 hover:bg-neutral-800 text-center flex items-center justify-center gap-1 cursor-pointer">
          PDF
        </button>
      </div>
    </div>
  );
}

function TicTacToeMock() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
    } else if (newBoard.every(square => square !== null)) {
      setWinner("Draw");
    } else {
      setIsXNext(!isXNext);
      // AI Move
      setTimeout(() => {
        const emptyIndices = newBoard.map((s, idx) => s === null ? idx : null).filter((v): v is number => v !== null);
        if (emptyIndices.length > 0) {
          const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          newBoard[randomIndex] = isXNext ? "O" : "X";
          setBoard(newBoard);
          const winAI = checkWinner(newBoard);
          if (winAI) {
            setWinner(winAI);
          } else if (newBoard.every(square => square !== null)) {
            setWinner("Draw");
          } else {
            setIsXNext(isXNext);
          }
        }
      }, 300);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="bg-white brutal-border p-3 w-full h-full text-black flex flex-col justify-between text-left">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] font-black uppercase">TIC TAC TOE</div>
          <div className="text-[8px] font-bold bg-[#ff6b00] text-white px-1.5 py-0.5 border border-black shadow-[1px_1px_0_0_#000]">
            {winner ? (winner === "Draw" ? "DRAW!" : `WIN: ${winner}`) : `TURN: ${isXNext ? "X" : "O"}`}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 w-20 h-20 mx-auto mt-1">
          {board.map((cell, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              className="brutal-border bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center font-black text-xs select-none active:translate-y-0.5 cursor-pointer"
              style={{ minHeight: "24px" }}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={resetGame}
        className="w-full text-[8px] font-black uppercase border border-black bg-black text-white py-0.5 text-center hover:bg-neutral-800 cursor-pointer"
      >
        Reset
      </button>
    </div>
  );
}

function MockUI({ kind }: { kind: Project["mock"] }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 min-h-0">
        {kind === "result" && <ResultManagementMock />}
        {kind === "resume" && <ResumeBuilderMock />}
        {kind === "tictactoe" && <TicTacToeMock />}
      </div>
      <div className="bg-black/90 text-white text-[7px] font-bold text-center py-1 px-2 tracking-wider uppercase">
        ⚠ Demo preview only — real app differs. Check links ↗
      </div>
    </div>
  );
}

export function BentoProjects() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[340px] gap-5">
      {projects.map((p) => (
        <article
          key={p.name}
          data-hover
          onMouseEnter={() => setHover(p.name)}
          onMouseLeave={() => setHover(null)}
          className={`relative brutal-border brutal-shadow p-6 md:p-8 transition-transform hover:-translate-x-1 hover:-translate-y-1 ${p.span}`}
          style={{ background: p.color, color: p.textOn }}
        >
          <div className="flex flex-col h-full justify-between relative z-10">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70">{p.tag}</div>
              <h3 className="text-4xl md:text-5xl font-black leading-none mb-3">{p.name}</h3>
              <p className="text-sm md:text-base font-medium max-w-md leading-snug">{p.desc}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-4 z-30 relative">
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-3 py-1.5 border-2 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:bg-white hover:text-black cursor-none"
                  style={{ borderColor: p.textOn, color: p.textOn }}
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Code
                </a>
              )}
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-3 py-1.5 border-2 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] cursor-none"
                  style={{
                    borderColor: p.textOn,
                    color: p.textOn === "#ffffff" ? "#0a0a0a" : "#ffffff",
                    backgroundColor: p.textOn
                  }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  Live
                </a>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mt-4 z-10">
              {p.stack.map(s => (
                <span key={s} className="text-[10px] font-black uppercase tracking-wider border-2 px-2 py-0.5"
                  style={{ borderColor: p.textOn }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`absolute top-4 right-4 w-[58%] h-[78%] transition-all duration-500 z-20 ${hover === p.name ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              }`}
          >
            <div className="w-full h-full brutal-shadow">
              <MockUI kind={p.mock} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

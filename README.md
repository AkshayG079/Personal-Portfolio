# Akshay Gedam — Personal Portfolio

A premium, interactive, and responsive developer portfolio showcasing engineering works, technical stack, and career achievements. Built with a bold brutalist aesthetic using React, Vite, TypeScript, GSAP, and Three.js.

🔗 **Live Site**: [https://akshayg079.github.io/Personal-Portfolio/](https://akshayg079.github.io/Personal-Portfolio/) (or your custom domain)  
🔗 **Repository**: [https://github.com/AkshayG079/Personal-Portfolio](https://github.com/AkshayG079/Personal-Portfolio)

---

## 🚀 Key Features

*   **Interactive Bento Grid Projects**: Displays real-world projects with dedicated GitHub code links and live demos, plus customized, fully interactive previews:
    *   **Result Management System**: Interactive database simulator showing real-time GPA calculations.
    *   **Resume Builder**: Accent theme customizer and draft inputs.
    *   **Tic-Tac-Toe**: A fully playable classic mini-game built right into the preview widget (vs a computer opponent).
*   **3D Interactive Tag Cloud**: A responsive, drag-and-hover 3D particle sphere using Three.js and HTML Canvas sprites, highlighting core backend and full-stack technologies.
*   **5-Link Scroll Spy Navigation**: Smooth, high-performance scroll tracking that highlights active sections (*Intro*, *Work*, *Stack*, *Journey*, *Contact*) in real-time, built using GSAP `ScrollTrigger`.
*   **Seamless Dual-Marquee Counter-Movement**: Perfectly loops text indicators (scrolling left-to-right and right-to-left) with a modular `50%` transition translation, avoiding abrupt resetting snaps.
*   **Premium Glassmorphic Design**: The header adapts dynamically to light/dark backgrounds with a backdrop-blur and border style change for maximum readability.
*   **Brutalist Visual Aesthetic**: Curated color scheme utilizing warm off-whites, bold outlines, and flat shadows.

---

## 🛠️ Tech Stack

*   **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animations**: [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/)
*   **3D Graphics**: [Three.js](https://threejs.org/)
*   **Router**: [TanStack Router](https://tanstack.com/router/latest)
*   **Package Manager**: [Bun](https://bun.sh/) (or `npm`)

---

## 📦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) or [Bun](https://bun.sh/) installed.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/AkshayG079/Personal-Portfolio.git
    cd Personal-Portfolio
    ```

2.  Install dependencies:
    ```bash
    bun install
    # or
    npm install
    ```

### Development Server

Start the development server with hot module replacement:

```bash
bun dev
# or
npm run dev
```

The app will start at `http://localhost:8080/`.

### Production Build

Build the production-optimized files:

```bash
bun run build
# or
npm run build
```

---

## 📂 Project Structure

```text
├── .lovable/             # Meta config files
├── src/
│   ├── components/       # Custom React components (Bento Grid, 3D Cloud, Cursor, etc.)
│   ├── hooks/            # Custom React hooks (responsive design helpers)
│   ├── lib/              # Library initializations (Three.js configurations, styles)
│   ├── routes/           # Router views and layouts
│   ├── styles.css        # Core design tokens and custom animations
│   ├── main.tsx          # Application entry point
├── package.json          # Dependency mappings
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite plugins and bundle configs
```

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

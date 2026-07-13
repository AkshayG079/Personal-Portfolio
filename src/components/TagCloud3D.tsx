import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { detectQuality, pixelRatioFor } from "@/lib/three-perf";

const TAGS = [
  { label: "React.js", desc: "Responsive client interfaces and dashboard systems." },
  { label: "Node.js", desc: "Highly-performant asynchronous execution environments." },
  { label: "Express.js", desc: "Robust router and middleware handlers for RESTful APIs." },
  { label: "TypeScript", desc: "Strong typing across the full MERN architecture." },
  { label: "MongoDB", desc: "Document store database for agile development cycles." },
  { label: "PostgreSQL", desc: "Relational integrity for structured datasets." },
  { label: "Redis", desc: "In-memory caching and message pub/sub routing." },
  { label: "MySQL", desc: "Core relational DB backing enterprise systems." },
  { label: "REST APIs", desc: "Decoupled, scalable contract endpoints for frontend clients." },
  { label: "SSE", desc: "Server-Sent Events for push notifications & real-time milestones." },
  { label: "Docker", desc: "Containerized deployments and microservice reproducibility." },
  { label: "RabbitMQ", desc: "Decoupled message-queues for asynchronous background tasks." },
  { label: "JWT Auth", desc: "Robust API security and token-based authentication." },
  // { label: "RBAC", desc: "Role-based access control models to isolate tenant data." },
  { label: "Next.js", desc: "Modern server-rendered web frameworks and SSR." },
  { label: "Socket.io", desc: "Bidirectional WebSocket communication channels." },
  { label: "Tailwind CSS", desc: "Utility-first CSS styling for highly custom components." },
  // { label: "Cron Jobs", desc: "Scheduled background workers and telemetry tasks." },
  { label: "Postman", desc: "Comprehensive testing and documentation of API endpoints." },
  { label: "GitHub", desc: "Collaborative codebases, PR workflows, and version control." },
];

function makeLabelSprite(text: string) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const fontSize = 64;
  ctx.font = `900 ${fontSize}px "Space Grotesk", system-ui`;
  const w = Math.ceil(ctx.measureText(text).width) + 40;
  const h = fontSize + 30;
  canvas.width = w;
  canvas.height = h;
  ctx.fillStyle = "#0a0a0a";
  ctx.font = `900 ${fontSize}px "Space Grotesk", system-ui`;
  ctx.textBaseline = "middle";
  ctx.fillText(text, 20, h / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(w / 60, h / 60, 1);
  return sprite;
}

export function TagCloud3D() {
  const mount = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<{ x: number; y: number; label: string; desc: string } | null>(null);

  useEffect(() => {
    const el = mount.current!;
    let disposed = false;
    let cleanup: (() => void) | null = null;

    const init = () => {
      if (disposed || cleanup) return;
      const tier = detectQuality();
      const antialias = tier !== "low";
      // On low-tier devices, sample a subset of tags to reduce sprite draws.
      const tags = tier === "low" ? TAGS.filter((_, i) => i % 2 === 0) : TAGS;

      const w = () => el.clientWidth;
      const h = () => el.clientHeight;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, w() / h(), 0.1, 100);
      camera.position.z = 14;
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias });
      renderer.setPixelRatio(pixelRatioFor(tier));
      renderer.setSize(w(), h());
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      const R = 6;
      const sprites: THREE.Sprite[] = [];
      tags.forEach((t, i) => {
        const phi = Math.acos(-1 + (2 * i) / tags.length);
        const theta = Math.sqrt(tags.length * Math.PI) * phi;
        const s = makeLabelSprite(t.label);
        s.position.setFromSphericalCoords(R, phi, theta);
        (s as any).userData = t;
        group.add(s);
        sprites.push(s);
      });

      let mouseX = 0, mouseY = 0;
      let targetRotY = 0, targetRotX = 0;
      let autoRotY = 0;
      let isHover = false;
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();

      const onMove = (e: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = (e.clientY - rect.top) / rect.height;
        mouseX = nx - 0.5;
        mouseY = ny - 0.5;
        targetRotY = mouseX * 1.5;
        targetRotX = mouseY * 1.0;

        pointer.x = nx * 2 - 1;
        pointer.y = -(ny * 2 - 1);
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(sprites);
        if (hits.length) {
          const u = (hits[0].object as any).userData;
          setTip({ x: e.clientX - rect.left, y: e.clientY - rect.top, label: u.label, desc: u.desc });
          isHover = true;
          el.style.setProperty("cursor", "none");
        } else {
          isHover = false;
          setTip(null);
        }
      };
      const onLeave = () => { setTip(null); isHover = false; };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);

      const onResize = () => {
        camera.aspect = w() / h();
        camera.updateProjectionMatrix();
        renderer.setSize(w(), h());
      };
      window.addEventListener("resize", onResize);

      let raf = 0;
      let running = true;
      const animate = () => {
        if (!running) return;
        autoRotY += 0.0025;
        group.rotation.y += ((isHover ? targetRotY : autoRotY) - group.rotation.y) * 0.05;
        group.rotation.x += (targetRotX - group.rotation.x) * 0.05;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      animate();

      const visIO = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !running) {
            running = true;
            animate();
          } else if (!entry.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(raf);
          }
        },
        { rootMargin: "100px" }
      );
      visIO.observe(el);

      const onVisibility = () => {
        if (document.hidden && running) {
          running = false;
          cancelAnimationFrame(raf);
        } else if (!document.hidden && !running) {
          running = true;
          animate();
        }
      };
      document.addEventListener("visibilitychange", onVisibility);

      cleanup = () => {
        running = false;
        cancelAnimationFrame(raf);
        visIO.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        window.removeEventListener("resize", onResize);
        sprites.forEach((s) => { (s.material as THREE.SpriteMaterial).map?.dispose(); s.material.dispose(); });
        renderer.dispose();
        if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
      };
    };

    let lazyIO: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      lazyIO = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            lazyIO?.disconnect();
            lazyIO = null;
            init();
          }
        },
        { rootMargin: "200px" }
      );
      lazyIO.observe(el);
    } else {
      init();
    }

    return () => {
      disposed = true;
      lazyIO?.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <div className="relative w-full h-[560px] brutal-border brutal-shadow bg-[var(--background)]">
      <div ref={mount} className="absolute inset-0" />
      {tip && (
        <div
          className="absolute pointer-events-none bg-black text-white px-3 py-2 brutal-border text-xs font-bold uppercase tracking-wide z-10"
          style={{ left: tip.x + 16, top: tip.y + 16 }}
        >
          <div className="text-[var(--orange)] mb-0.5">{tip.label}</div>
          <div className="text-white/80 normal-case font-medium tracking-normal">{tip.desc}</div>
        </div>
      )}
      <div className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-widest opacity-50">
        drag · hover · click
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { detectQuality, pixelRatioFor } from "@/lib/three-perf";

export function NodeField() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current!;
    let disposed = false;
    let cleanup: (() => void) | null = null;

    const init = () => {
      if (disposed || cleanup) return;

      const tier = detectQuality();
      const N = tier === "low" ? 24 : tier === "medium" ? 40 : 60;
      const THRESHOLD = tier === "low" ? 3.6 : 4.2;
      const antialias = tier !== "low";
      const accentCount = tier === "low" ? 2 : 4;

      const w = () => el.clientWidth;
      const h = () => el.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, w() / h(), 0.1, 1000);
      camera.position.z = 22;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias });
      renderer.setPixelRatio(pixelRatioFor(tier));
      renderer.setSize(w(), h());
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);

      const positions = new Float32Array(N * 3);
      const velocities: THREE.Vector3[] = [];
      const RANGE = 18;
      for (let i = 0; i < N; i++) {
        positions[i * 3] = (Math.random() - 0.5) * RANGE;
        positions[i * 3 + 1] = (Math.random() - 0.5) * RANGE;
        positions[i * 3 + 2] = (Math.random() - 0.5) * RANGE * 0.7;
        velocities.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02
          )
        );
      }

      const pointsGeo = new THREE.BufferGeometry();
      pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const pointsMat = new THREE.PointsMaterial({
        color: 0x0a0a0a,
        size: 0.28,
        sizeAttenuation: true,
      });
      const points = new THREE.Points(pointsGeo, pointsMat);
      scene.add(points);

      const lineGeo = new THREE.BufferGeometry();
      const maxPairs = N * 6;
      const linePositions = new Float32Array(maxPairs * 2 * 3);
      lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x0a0a0a,
        transparent: true,
        opacity: 0.22,
      });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lines);

      const accentGeo = new THREE.SphereGeometry(0.4, 16, 16);
      const accentMat = new THREE.MeshBasicMaterial({ color: 0xff6b00 });
      const accents: THREE.Mesh[] = [];
      for (let i = 0; i < accentCount; i++) {
        const m = new THREE.Mesh(accentGeo, accentMat);
        m.position.set(
          (Math.random() - 0.5) * RANGE,
          (Math.random() - 0.5) * RANGE,
          (Math.random() - 0.5) * RANGE * 0.7
        );
        (m as any).vel = new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        );
        scene.add(m);
        accents.push(m);
      }

      let mouseX = 0, mouseY = 0;
      const onMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMove);

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
        const pos = pointsGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < N; i++) {
          pos[i * 3] += velocities[i].x;
          pos[i * 3 + 1] += velocities[i].y;
          pos[i * 3 + 2] += velocities[i].z;
          for (let a = 0; a < 3; a++) {
            if (Math.abs(pos[i * 3 + a]) > RANGE / 2)
              velocities[i].setComponent(a, -velocities[i].getComponent(a));
          }
        }
        pointsGeo.attributes.position.needsUpdate = true;

        let pair = 0;
        for (let i = 0; i < N && pair < maxPairs; i++) {
          for (let j = i + 1; j < N && pair < maxPairs; j++) {
            const dx = pos[i * 3] - pos[j * 3];
            const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
            const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
            const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (d < THRESHOLD) {
              linePositions[pair * 6] = pos[i * 3];
              linePositions[pair * 6 + 1] = pos[i * 3 + 1];
              linePositions[pair * 6 + 2] = pos[i * 3 + 2];
              linePositions[pair * 6 + 3] = pos[j * 3];
              linePositions[pair * 6 + 4] = pos[j * 3 + 1];
              linePositions[pair * 6 + 5] = pos[j * 3 + 2];
              pair++;
            }
          }
        }
        for (let k = pair * 6; k < linePositions.length; k++) linePositions[k] = 0;
        lineGeo.attributes.position.needsUpdate = true;
        lineGeo.setDrawRange(0, pair * 2);

        accents.forEach((m) => {
          const v = (m as any).vel as THREE.Vector3;
          m.position.add(v);
          (["x", "y", "z"] as const).forEach((a) => {
            if (Math.abs(m.position[a]) > RANGE / 2) v[a] = -v[a];
          });
        });

        scene.rotation.y += (mouseX * 0.15 - scene.rotation.y) * 0.04;
        scene.rotation.x += (mouseY * 0.1 - scene.rotation.x) * 0.04;

        renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      animate();

      // Pause when offscreen
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
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        pointsGeo.dispose();
        lineGeo.dispose();
        accentGeo.dispose();
        pointsMat.dispose();
        lineMat.dispose();
        accentMat.dispose();
        if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
      };
    };

    // Lazy: only initialize once the element scrolls into view
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

  return <div ref={mount} className="absolute inset-0" />;
}

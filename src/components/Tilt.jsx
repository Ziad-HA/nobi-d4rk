import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Cursor-driven 3D tilt. Only runs with a real hover pointer and when the user has not asked for reduced motion.
export default function Tilt({ children, className = "", max = 9, lift = 24 }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return undefined;
      const mm = gsap.matchMedia();

      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(el, { transformPerspective: 900, transformOrigin: "50% 50%" });
        const opts = { duration: 0.45, ease: "power3.out" };
        const rx = gsap.quickTo(el, "rotationX", opts);
        const ry = gsap.quickTo(el, "rotationY", opts);
        const z = gsap.quickTo(el, "z", opts);

        const onMove = (e) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          ry(px * max * 2);
          rx(-py * max * 2);
          z(lift);
        };
        const onLeave = () => {
          rx(0);
          ry(0);
          z(0);
        };

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
export default function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 150, damping: 18 }), ry = useSpring(y, { stiffness: 150, damping: 18 });
  const [big, setBig] = useState(false);
  const [fine, setFine] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setFine(true);
    const m = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); setBig(!!(e.target as HTMLElement).closest("a,button,[role=tab],input")); };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, [x, y]);
  if (!fine) return null;
  return (
    <>
      <motion.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[100] -ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-butter mix-blend-difference" />
      <motion.div aria-hidden style={{ x: rx, y: ry }} animate={{ scale: big ? 1.8 : 1 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-5 -mt-5 h-10 w-10 rounded-full border-2 border-terracotta mix-blend-difference" />
    </>
  );
}

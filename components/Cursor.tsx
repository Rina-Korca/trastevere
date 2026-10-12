"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
export default function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 }), sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [big, setBig] = useState(false);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);
    const m = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); setBig(!!(e.target as HTMLElement).closest("a,button,input,[data-hover]")); };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, [x, y]);
  if (!on) return null;
  return (
    <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference">
      <motion.div animate={{ width: big ? 64 : 12, height: big ? 64 : 12 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-bone" />
    </motion.div>
  );
}

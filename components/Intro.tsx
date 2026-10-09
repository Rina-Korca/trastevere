"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
export default function Intro() {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 1500); return () => clearTimeout(t); }, []);
  if (done) return null;
  return (
    <div aria-hidden className="fixed inset-0 z-[200] grid grid-cols-6 grid-rows-4 pointer-events-none">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div key={i} className={i % 3 === 0 ? "bg-terracotta" : i % 3 === 1 ? "bg-butter" : "bg-olive"}
          initial={{ rotateY: 0 }} animate={{ rotateY: 90, opacity: 0 }} transition={{ delay: 0.5 + ((i % 6) + Math.floor(i / 6)) * 0.07, duration: 0.5 }} />
      ))}
    </div>
  );
}

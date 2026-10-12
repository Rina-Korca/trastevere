"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { business } from "@/lib/business-info";
export default function Intro() {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 2200); return () => clearTimeout(t); }, []);
  if (done) return null;
  return (
    <motion.div aria-hidden initial={{ y: 0 }} animate={{ y: "-100%" }} transition={{ delay: 1.5, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] grid place-items-center bg-ink text-bone">
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="display text-6xl italic md:text-8xl">{business.name}</motion.p>
    </motion.div>
  );
}

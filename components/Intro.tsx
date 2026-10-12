"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
export default function Intro() {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), 2000); return () => clearTimeout(t); }, []);
  if (done) return null;
  return (
    <motion.div aria-hidden initial={{ y: 0 }} animate={{ y: "-100%" }} transition={{ delay: 1.3, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] grid place-items-center bg-ink">
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.1 }}>
        <Image src="/images/logo-full.png" alt="" width={560} height={126} priority className="h-auto w-[78vw] max-w-xl" />
      </motion.div>
    </motion.div>
  );
}

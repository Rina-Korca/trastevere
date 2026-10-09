"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const text = "Amici heißt Freunde. Bei uns wird geteilt, gelacht und nachbestellt. Ein Tisch, eine Platte in der Mitte, ein Glas Wein in der Hand – so schmeckt italienische Gastfreundschaft, mitten in der Stadt.";

function Word({ w, p, range }: { w: string; p: MotionValue<number>; range: [number, number] }) {
  const o = useTransform(p, range, [0.15, 1]);
  return <motion.span style={{ opacity: o }} className="mr-[0.25em] inline-block">{w}</motion.span>;
}

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });
  const words = text.split(" ");
  return (
    <section id="geschichte" ref={ref} className="bg-espresso px-5 py-28 text-travertine">
      <p className="mx-auto max-w-5xl font-display text-3xl leading-tight md:text-6xl">
        {words.map((w, i) => <Word key={i} w={w} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />)}
      </p>
    </section>
  );
}

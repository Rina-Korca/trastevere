"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const text = "Amici heißt Freunde. Bei uns wird geteilt, gelacht und nachbestellt. Eine Platte in der Mitte, ein Glas Wein in der Hand – so schmeckt italienische Gastfreundschaft, mitten in der Stadt.";

function Word({ w, p, range }: { w: string; p: MotionValue<number>; range: [number, number] }) {
  const o = useTransform(p, range, [0.18, 1]);
  return <motion.span style={{ opacity: o }} className="mr-[0.22em] inline-block">{w}</motion.span>;
}

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const img = useTransform(useScroll({ target: ref, offset: ["start end", "end start"] }).scrollYProgress, [0, 1], ["-8%", "8%"]);
  const words = text.split(" ");
  return (
    <section id="geschichte" ref={ref} className="bg-ink px-5 py-32 text-bone md:px-10 md:py-48">
      <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="label mb-8 text-gold">— Unsere Haltung</p>
          <p className="display text-4xl leading-[1.08] md:text-7xl">
            {words.map((w, i) => <Word key={i} w={w} p={scrollYProgress} range={[i / words.length, Math.min(1, (i + 3) / words.length)]} />)}
          </p>
        </div>
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px]">
            <motion.div style={{ y: img }} className="absolute inset-[-10%]"><Image src="/images/friends.jpg" alt="Freunde am Tisch" fill sizes="(min-width:768px) 40vw, 90vw" className="object-cover" /></motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

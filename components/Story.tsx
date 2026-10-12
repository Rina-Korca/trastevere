"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const pillars = [
  { n: "01", t: "Teilen", d: "Platten und Pizza kommen in die Mitte, und bedient wird sich gemeinsam. Probieren, tauschen, nachnehmen: So schmeckt jeder Bissen ein bisschen besser." },
  { n: "02", t: "Zusammen", d: "Ein Tisch, viele Geschichten. Hier darf gelacht, erzählt und gefeiert werden – und der Abend darf ruhig länger dauern als geplant." },
  { n: "03", t: "Genießen", d: "Italienische Gastfreundschaft heißt: ohne Eile, mit offenen Armen und dem Gefühl, ein bisschen wie zu Hause zu sein." },
];

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const w = useTransform(scrollYProgress, [0, 0.55], ["34vw", "100vw"]);
  const h = useTransform(scrollYProgress, [0, 0.55], ["46vh", "100vh"]);
  const r = useTransform(scrollYProgress, [0, 0.55], [999, 0]);
  const textO = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.25, 0.5], [40, 0]);
  const labelO = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  return (
    <>
      <section id="geschichte" ref={ref} className="relative h-[300vh] bg-ink text-bone">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <motion.p style={{ opacity: labelO }} className="display absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(5rem,22vw,24rem)] leading-none text-bone/10">Amici</motion.p>
          <motion.div style={{ width: w, height: h, borderTopLeftRadius: r, borderTopRightRadius: r }} className="relative z-10 overflow-hidden rounded-b-3xl">
            <Image src="/images/friends.jpg" alt="Freunde am Tisch" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-ink/45" />
          </motion.div>
          <motion.div style={{ opacity: textO, y: textY }} className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
            <p className="label text-gold">Amici = Freunde</p>
            <p className="display mt-6 max-w-4xl text-5xl md:text-8xl">Gutes Essen schmeckt <em>besser</em> in guter Gesellschaft.</p>
          </motion.div>
        </div>
      </section>
      <section className="bg-ink px-5 pb-16 text-bone md:px-10 md:pb-24">
        <div className="mx-auto grid max-w-7xl border-t border-bone/20 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div key={p.n} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, delay: i * 0.12 }}
              className="border-b border-bone/20 py-10 md:border-b-0 md:border-r md:px-8 md:last:border-r-0 md:first:pl-0">
              <span className="label text-gold">{p.n}</span>
              <h3 className="display mt-6 text-5xl md:text-6xl">{p.t}</h3>
              <p className="mt-4 max-w-xs text-bone/60">{p.d}</p>
            </motion.div>))}
        </div>
      </section>
    </>
  );
}

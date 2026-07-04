"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export function Stats() {
  return (
    <section className="relative -mt-8 px-6 sm:-mt-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-3xl flex-col items-center gap-3 rounded-3xl border border-black/5 bg-white px-8 py-10 text-center shadow-[0_20px_60px_-20px_rgba(17,24,39,0.15)]"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          <Heart className="h-6 w-6 fill-brand" />
        </span>
        <div className="font-display text-4xl font-extrabold text-ink sm:text-5xl">
          <AnimatedCounter value={18432} suffix="+" />
        </div>
        <p className="text-muted">histórias de amor eternizadas e contando</p>
      </motion.div>
    </section>
  );
}

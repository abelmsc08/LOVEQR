"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/particles";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-brand py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.15),transparent_45%)]" />
        <Particles count={22} />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/30"
        >
          <Heart className="h-7 w-7 fill-white text-white" />
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-8 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl"
        >
          Sua história merece ser lembrada para sempre.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-5 max-w-lg text-lg text-white/80"
        >
          Crie agora a página que vai emocionar quem você mais ama — pronta em minutos, para durar uma vida inteira.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <Button size="lg" variant="secondary">
            <Heart className="h-4 w-4 fill-brand text-brand" />
            Criar Meu QR Love
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

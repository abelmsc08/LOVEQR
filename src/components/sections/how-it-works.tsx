"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { QrArt } from "@/components/ui/qr-art";

const steps = [
  "Preencha as informações com o nome do casal",
  "Escreva uma mensagem especial para quem você ama",
  "Escolha a data em que vocês se conheceram",
  "Escolha as fotos mais marcantes do relacionamento",
  "Escolha uma música que representa vocês dois",
  "Pague e receba sua página com o QR Code",
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative overflow-hidden bg-ink py-28 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_20%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-8">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-light"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Simples assim
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl"
          >
            Como funciona
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-lg text-lg text-white/50"
          >
            Seis passos rápidos para transformar sua história de amor em uma experiência inesquecível.
          </motion.p>

          <ul className="mt-10 flex flex-col gap-1">
            {steps.map((step, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-white/5"
              >
                <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-light/40 text-brand-light transition-colors duration-300 group-hover:bg-gradient-brand group-hover:text-white group-hover:border-transparent">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-[15px] font-medium text-white/80">
                  <span className="mr-1.5 text-white/30">{i + 1}.</span>
                  {step}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex justify-center"
        >
          <div className="absolute inset-0 rounded-[2.5rem] bg-brand/25 blur-3xl animate-glow" />

          <div className="relative animate-float-slow rounded-[2rem] bg-white p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] sm:p-9">
            <div className="relative overflow-hidden rounded-xl">
              <QrArt className="h-48 w-48 sm:h-56 sm:w-56" />
              <div
                className="pointer-events-none absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-brand/25 to-transparent"
                style={{ animation: "scan 3.2s ease-in-out infinite" }}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="glass-dark absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white shadow-lg"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-light animate-pulse" />
            pronto em minutos
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

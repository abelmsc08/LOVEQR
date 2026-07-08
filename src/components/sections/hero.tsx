"use client";

import { motion } from "framer-motion";
import { Heart, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/particles";
import { HeroPlansCarousel } from "@/components/ui/hero-plans-carousel";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fce9e6] pt-36 pb-20 sm:pt-44 sm:pb-28 md:bg-white">

      {/* ── Imagens de fundo responsivas ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Desktop — landscape, cobre tudo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/publichero-bg-desktop.webp"
          alt=""
          className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
        />
        {/* Mobile — portrait, mostra a imagem toda (contain) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/publichero-bg-mobile.webp"
          alt=""
          className="absolute inset-0 block h-full w-full object-contain object-top md:hidden"
        />

        {/* Overlay — mobile bem leve, desktop mais forte para legibilidade */}
        <div className="absolute inset-0 bg-white/20 md:bg-white/55" />

        {/* Blur no topo */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#fce9e6]/80 to-transparent md:from-white/90" />

        {/* Blur na base */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#fce9e6]/90 to-transparent md:from-white/90" />

        {/* Blob canto superior esquerdo */}
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/30 blur-3xl" />

        {/* Blob canto inferior direito */}
        <div className="absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-white/30 blur-3xl" />

        {/* Blob central */}
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-3xl" />

        {/* Grade sutil */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,24,39,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,24,39,0.025)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_20%,transparent_75%)]" />

        {/* Partículas */}
        <div className="absolute inset-0">
          <Particles count={14} />
        </div>
      </div>

      {/* ── Conteúdo ── */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-4 py-1.5 text-sm font-medium text-brand"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Mais de 18.000 histórias eternizadas
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Seu amor merece uma página que{" "}
            <span className="text-gradient">nunca será esquecida.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            Crie em minutos uma página personalizada com fotos, música e uma
            carta de amor. Compartilhe com um QR Code exclusivo e transforme
            um momento em uma lembrança para toda a vida.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Button size="lg" variant="primary">
              <Heart className="h-4 w-4 fill-white" />
              Criar Meu QR Love
            </Button>
            <Button size="lg" variant="secondary">
              <Play className="h-4 w-4" />
              Ver Demonstração
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"
          >
            <span>✓ Pronto em minutos</span>
            <span>✓ Funciona em qualquer celular</span>
            <span>✓ Editável a qualquer momento</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="absolute -inset-x-10 -inset-y-10 rounded-[3rem] bg-gradient-to-br from-brand/10 to-transparent blur-2xl" />
          <HeroPlansCarousel />
        </motion.div>
      </div>
    </section>
  );
}

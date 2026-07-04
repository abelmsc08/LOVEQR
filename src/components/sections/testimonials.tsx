"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Fernanda Alves",
    role: "Presenteou o namorado",
    quote:
      "Nunca vi ele tão emocionado. A página ficou linda, com nossa música e todas as fotos. Melhor presente que já dei.",
    initials: "FA",
  },
  {
    name: "Rodrigo Lima",
    role: "Pediu namoro",
    quote:
      "Usei para pedir ela em namoro. O contador e a carta deixaram tudo mais especial. Recomendo demais!",
    initials: "RL",
  },
  {
    name: "Camila Souza",
    role: "Aniversário de namoro",
    quote:
      "Muito fácil de criar e o resultado parece coisa de outro nível. Ficamos com o QR Code emoldurado em casa.",
    initials: "CS",
  },
  {
    name: "Bruno Costa",
    role: "Pedido de casamento",
    quote:
      "Criei a página no dia do pedido. Simples, rápido e extremamente emocionante ver tudo junto na tela dela.",
    initials: "BC",
  },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="relative bg-brand-soft/40 py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-widest text-brand"
          >
            Histórias reais
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl"
          >
            Casais que já viveram essa experiência
          </motion.h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass flex flex-col rounded-3xl p-6 shadow-[0_10px_30px_-18px_rgba(17,24,39,0.2)]"
            >
              <div className="flex gap-0.5 text-brand">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-brand" />
                ))}
              </div>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/80">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-sm font-semibold text-white">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

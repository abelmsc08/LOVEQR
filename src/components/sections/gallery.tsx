"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getElapsed } from "@/lib/relationship-time";

type Category = {
  id: string;
  label: string;
  price: string;
  names: string;
  message: string;
  since: string;
};

const categories: Category[] = [
  {
    id: "evento",
    label: "Evento",
    price: "R$ 4,90",
    names: "Maria & João",
    message:
      "Cada momento ao seu lado é uma nova razão para sorrir. Você é meu porto seguro, minha alegria diária e meu amor eterno.",
    since: "2019-03-14T10:00:00",
  },
  {
    id: "delux",
    label: "Delux",
    price: "R$ 19,90",
    names: "Ana & Pedro",
    message:
      "Com você aprendi que amor de verdade é escolher todos os dias. Obrigado por transformar minha vida numa história linda.",
    since: "2022-03-12T18:30:00",
  },
  {
    id: "filme",
    label: "Filme",
    price: "R$ 27,90",
    names: "Rafa & Duda",
    message:
      "Nossa história daria um filme inteiro. E o melhor capítulo é que ele continua sendo escrito, junto de você.",
    since: "2021-07-01T09:15:00",
  },
];

export function Gallery() {
  const [active, setActive] = useState("evento");
  const [elapsed, setElapsed] = useState(() => getElapsed(categories[0].since));

  const category = categories.find((c) => c.id === active)!;

  useEffect(() => {
    const tick = () => setElapsed(getElapsed(category.since));
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [category.since]);

  const units = [
    { label: "anos", value: elapsed.years },
    { label: "meses", value: elapsed.months },
    { label: "dias", value: elapsed.days },
    { label: "horas", value: elapsed.hours },
    { label: "minutos", value: elapsed.minutes },
    { label: "segundos", value: elapsed.seconds },
  ];

  return (
    <section id="galeria" className="overflow-hidden bg-white py-28 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-widest text-brand"
        >
          Inspire-se
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl"
        >
          Exemplos de páginas
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-lg text-muted"
        >
          Veja diferentes estilos de páginas que você pode criar.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="mt-10 flex justify-center"
      >
        <div className="inline-flex gap-1 rounded-full border border-black/5 bg-black/[0.03] p-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "flex flex-col items-center rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300",
                active === cat.id
                  ? "bg-ink text-white shadow-md"
                  : "text-muted hover:text-ink"
              )}
            >
              {cat.label}
              <span
                className={cn(
                  "text-[11px] font-medium",
                  active === cat.id ? "text-white/60" : "text-muted/70"
                )}
              >
                {cat.price}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-14 flex justify-center"
      >
        <div className="absolute inset-x-10 top-10 h-72 rounded-[3rem] bg-brand/15 blur-3xl" />

        <div className="relative w-[300px] rounded-[2.75rem] border-[6px] border-ink bg-ink p-2 shadow-2xl sm:w-[320px]">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-28 -translate-x-1/2 rounded-full bg-ink" />
          <div className="relative min-h-[600px] w-full overflow-hidden rounded-[2.25rem] bg-gradient-to-b from-brand to-brand-dark">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(255,255,255,0.18),transparent_55%)]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4 }}
                className="relative flex flex-col items-center px-6 pb-8 pt-14 text-center text-white"
              >
                <h3
                  className="text-4xl leading-tight"
                  style={{ fontFamily: "var(--font-script)" }}
                >
                  {category.names}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-white/85">
                  {category.message}
                </p>

                <p
                  className="mt-6 text-2xl text-white/95"
                  style={{ fontFamily: "var(--font-script)" }}
                >
                  Juntos há
                </p>

                <div className="mt-4 grid w-full grid-cols-2 gap-2.5">
                  {units.map((unit) => (
                    <div
                      key={unit.label}
                      className="rounded-2xl bg-white/15 py-3 backdrop-blur-md ring-1 ring-white/25"
                    >
                      <p className="font-display text-2xl font-extrabold tabular-nums">
                        {unit.value}
                      </p>
                      <p className="text-[11px] uppercase tracking-wide text-white/70">
                        {unit.label}
                      </p>
                    </div>
                  ))}
                </div>

                <span className="mt-6 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
                  <Heart className="h-4 w-4 fill-white" />
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-10 flex justify-center"
      >
        <Button size="lg" variant="primary">
          Quero esse modelo
        </Button>
      </motion.div>
    </section>
  );
}

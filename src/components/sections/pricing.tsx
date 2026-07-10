"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { plans, formatBRL } from "@/lib/plans";

export function Pricing() {
  const router = useRouter();

  return (
    <section id="planos" className="relative overflow-hidden bg-white py-28 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-widest text-brand"
          >
            Escolha o seu presente
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl"
          >
            Qual página combina mais com vocês?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-muted"
          >
            Todos os planos têm pagamento único e liberação imediata.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={cn(
                "group relative flex flex-col rounded-3xl border p-7 text-left shadow-[0_10px_30px_-18px_rgba(17,24,39,0.2)] transition-all duration-300",
                p.highlight
                  ? "border-brand bg-brand-soft/60 shadow-[0_20px_50px_-20px_rgba(185,28,28,0.35)] ring-2 ring-brand"
                  : "border-black/5 bg-white hover:border-brand/30 hover:shadow-[0_20px_50px_-20px_rgba(185,28,28,0.2)]"
              )}
            >
              {p.badge && (
                <span className="absolute -top-3 left-7 flex items-center gap-1 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-white shadow-md">
                  <Sparkles className="h-3 w-3" />
                  {p.badge}
                </span>
              )}

              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl transition-colors",
                  p.highlight ? "bg-gradient-brand text-white" : "bg-brand-soft text-brand"
                )}
              >
                <p.icon className="h-5 w-5" />
              </span>

              <h3 className="mt-5 font-display text-xl font-bold text-ink">{p.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-sm text-muted line-through">
                  R$ {formatBRL(p.oldPrice)}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl font-extrabold text-brand">
                  R$ {formatBRL(p.price)}
                </span>
              </div>
              <span className="mt-1 inline-block w-fit rounded-full bg-black/[0.04] px-2.5 py-1 text-xs font-medium text-muted">
                Página válida por {p.duration}
              </span>

              <ul className="mt-6 flex flex-col gap-2.5">
                {p.features.map((f) => (
                  <li key={f.label} className="flex items-start gap-2 text-sm">
                    {f.included ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-black/25" />
                    )}
                    <span className={f.included ? "text-ink/80" : "text-black/35"}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => router.push(`/criar?plano=${p.id}`)}
                className={cn(
                  "mt-7 flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold transition-all",
                  p.highlight
                    ? "bg-green-500 text-white shadow-[0_8px_24px_-6px_rgba(34,197,94,0.55)] hover:bg-green-600 hover:-translate-y-0.5"
                    : "bg-green-500 text-white hover:bg-green-600 hover:-translate-y-0.5"
                )}
              >
                {p.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

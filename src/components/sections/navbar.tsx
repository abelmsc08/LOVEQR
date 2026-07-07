"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const links = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Planos", href: "#planos" },
  { label: "Exemplos", href: "#galeria" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div
        className={cn(
          "mx-auto max-w-7xl transition-all duration-500",
          scrolled ? "mt-3 px-4" : "mt-0 px-0"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-500 rounded-full",
            scrolled
              ? "glass shadow-[0_8px_30px_-8px_rgba(17,24,39,0.15)] px-5 py-2.5"
              : "bg-transparent px-6 py-5"
          )}
        >
          <a href="#" className="flex items-center gap-2 font-display font-bold text-lg text-ink">
            <Logo size={32} />
            Meu QR Love
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink/70 hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button size="sm" variant="primary">
              Criar Meu QR Love
            </Button>
          </div>

          <button
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full text-ink"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden mx-4 mt-2 overflow-hidden rounded-3xl glass shadow-xl"
          >
            <div className="flex flex-col p-4 gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-ink/80 hover:bg-black/5"
                >
                  {link.label}
                </a>
              ))}
              <Button size="sm" variant="primary" className="mt-2">
                Criar Meu QR Love
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona o Meu QR Love?",
    answer:
      "Você preenche um formulário simples com fotos, música, data especial e uma mensagem. Em minutos criamos sua página personalizada e geramos um QR Code exclusivo para compartilhar.",
  },
  {
    question: "Preciso instalar algum aplicativo?",
    answer:
      "Não. Sua página funciona diretamente no navegador, tanto para quem cria quanto para quem recebe o QR Code. Basta escanear e abrir.",
  },
  {
    question: "Posso editar minha página depois de criada?",
    answer:
      "Sim! Você pode editar fotos, textos e música a qualquer momento dentro do prazo do seu plano, direto pelo painel.",
  },
  {
    question: "Por quanto tempo minha página fica disponível?",
    answer:
      "Depende do plano escolhido, variando de 1 mês até acesso vitalício. Todos os detalhes ficam visíveis antes da finalização da compra.",
  },
  {
    question: "O QR Code pode ser impresso?",
    answer:
      "Sim, você recebe uma imagem em alta resolução do seu QR Code, perfeita para imprimir em cartões, quadros ou presentes físicos.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-28 sm:py-32">
      <div className="text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-widest text-brand"
        >
          Dúvidas
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl"
        >
          Perguntas frequentes
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-12"
      >
        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}

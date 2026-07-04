import { Gift, Sparkles, Cake, Clapperboard } from "lucide-react";

export type Feature = { label: string; included: boolean };

export type Plan = {
  id: string;
  name: string;
  icon: typeof Gift;
  badge?: string;
  oldPrice: number;
  price: number;
  duration: string;
  description: string;
  features: Feature[];
  cta: string;
  highlight?: boolean;
};

export const plans: Plan[] = [
  {
    id: "evento",
    name: "Evento Especial",
    icon: Gift,
    oldPrice: 19.9,
    price: 4.9,
    duration: "1 mês",
    description: "O jeito mais rápido de surpreender com uma página própria.",
    features: [
      { label: "Página disponível por 1 mês", included: true },
      { label: "Contador de relacionamento", included: true },
      { label: "QR Code compartilhável", included: true },
      { label: "5 fotos exclusivas do casal", included: true },
      { label: "Música de fundo", included: false },
      { label: "Seleção de cores do tema", included: false },
    ],
    cta: "Selecionar página de 1 mês",
  },
  {
    id: "delux",
    name: "Delux",
    icon: Sparkles,
    badge: "Mais escolhido",
    oldPrice: 24.9,
    price: 19.9,
    duration: "1 ano",
    description: "Uma página premium e elegante para celebrar o amor com estilo.",
    features: [
      { label: "Página disponível por 1 ano", included: true },
      { label: "Design premium exclusivo", included: true },
      { label: "Contador de relacionamento", included: true },
      { label: "QR Code compartilhável", included: true },
      { label: "10 fotos exclusivas do casal", included: true },
      { label: "Com música e editável em 24h", included: true },
    ],
    cta: "Criar página de 1 ano",
    highlight: true,
  },
  {
    id: "aniversario",
    name: "Cartão de Aniversário",
    icon: Cake,
    oldPrice: 18.9,
    price: 13.9,
    duration: "1 mês",
    description: "Surpreenda alguém especial com um cartão animado de aniversário.",
    features: [
      { label: "Página disponível por 1 mês", included: true },
      { label: "Presente animado de aniversário", included: true },
      { label: "Título e mensagem personalizados", included: true },
      { label: "Efeitos especiais (confetes)", included: true },
      { label: "10 fotos exclusivas", included: true },
      { label: "Com música e editável em 24h", included: true },
    ],
    cta: "Criar cartão de aniversário",
  },
  {
    id: "poster",
    name: "Poster de Filme",
    icon: Clapperboard,
    oldPrice: 39.9,
    price: 27.9,
    duration: "2 anos",
    description: "Transforme sua história de amor em um poster estilo cinema.",
    features: [
      { label: "Página disponível por 2 anos", included: true },
      { label: "Poster estilo cinema para baixar", included: true },
      { label: "Título, tagline e sinopse", included: true },
      { label: "Slideshow de fotos", included: true },
      { label: "10 fotos exclusivas", included: true },
      { label: "Com música e editável em 24h", included: true },
    ],
    cta: "Criar poster de filme",
  },
];

export function getPlan(id: string | undefined) {
  return plans.find((p) => p.id === id) ?? plans[1];
}

export function planHasMusic(plan: Plan) {
  return plan.features.some((f) => /música/i.test(f.label) && f.included);
}

export const MUSIC_ADDON_PRICE = 7;

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Heart, Sparkles, Users, QrCode } from "lucide-react";

export const metadata = {
  title: "Sobre nós — Meu QR Love",
  description: "Conheça a história por trás do Meu QR Love e nossa missão de eternizar histórias de amor.",
};

export default function Sobre() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-ink py-5">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <Logo size={28} />
            Meu QR Love
          </Link>
          <Link href="/" className="text-sm text-white/50 transition-colors hover:text-white">
            ← Voltar ao início
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        {/* Hero */}
        <div className="text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10">
            <Heart className="h-8 w-8 fill-brand text-brand" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-extrabold text-ink sm:text-5xl">
            Sobre o Meu QR Love
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Nascemos com uma missão simples: transformar histórias de amor em memórias eternas,
            acessíveis com um simples toque de câmera.
          </p>
        </div>

        {/* Nossa história */}
        <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand/5 to-brand/10 px-8 py-10">
          <h2 className="font-display text-2xl font-bold text-ink">Nossa história</h2>
          <p className="mt-4 leading-relaxed text-muted">
            O Meu QR Love surgiu de uma ideia simples, mas poderosa: e se você pudesse entregar para alguém
            especial não apenas um presente físico, mas uma <strong className="text-ink">experiência completa</strong> —
            com as fotos mais marcantes, a música que representa vocês dois e uma mensagem escrita direto do coração?
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Cada detalhe da plataforma foi pensado para que qualquer pessoa — independente de conhecimento técnico —
            consiga criar algo lindo em poucos minutos. Porque acreditamos que o amor merece ser celebrado com cuidado,
            e que as memórias mais bonitas merecem durar para sempre.
          </p>
        </div>

        {/* Missão, valores */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Heart,
              title: "Nossa missão",
              desc: "Tornar acessível a qualquer pessoa a criação de uma experiência digital única e emocionante para quem ama.",
            },
            {
              icon: Sparkles,
              title: "Nossos valores",
              desc: "Simplicidade, beleza e emoção. Cada detalhe é pensado para que o presenteado sinta que aquilo foi feito especialmente para ele.",
            },
            {
              icon: Users,
              title: "Nossa comunidade",
              desc: "Mais de 18.000 histórias de amor eternizadas. Cada página criada representa um momento único que merecia ser guardado.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-black/5 bg-gray-50 p-6">
              <Icon className="h-7 w-7 text-brand" />
              <h3 className="mt-3 font-display text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
            </div>
          ))}
        </div>

        {/* Como funciona resumido */}
        <div className="mt-14">
          <h2 className="font-display text-2xl font-bold text-ink">O que entregamos</h2>
          <p className="mt-3 leading-relaxed text-muted">
            No Meu QR Love você cria uma página digital personalizada com:
          </p>
          <ul className="mt-4 space-y-2 text-base text-muted">
            {[
              "Fotos do casal ou da pessoa homenageada",
              "Uma mensagem escrita com todo o seu carinho",
              "Música do YouTube que representa a história de vocês",
              "Contagem de tempo juntos (anos, meses, dias, horas)",
              "QR Code exclusivo para presentear de forma especial",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-[10px] text-brand">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-ink px-8 py-12 text-center">
          <QrCode className="h-10 w-10 text-brand-light" />
          <h2 className="font-display text-2xl font-bold text-white">
            Pronto para eternizar sua história?
          </h2>
          <p className="max-w-sm text-white/60">
            Crie agora em poucos minutos. A pessoa que você ama merece essa surpresa.
          </p>
          <Link
            href="/#planos"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-3.5 text-sm font-bold text-white shadow-[0_8px_30px_-6px_rgba(185,28,28,0.55)] transition-transform hover:-translate-y-0.5"
          >
            <Heart className="h-4 w-4 fill-white" />
            Criar Meu QR Love
          </Link>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}

function PageFooter() {
  return (
    <footer className="mt-20 border-t border-black/5 bg-gray-50 py-8 text-center text-sm text-muted">
      <p>© {new Date().getFullYear()} Meu QR Love · Todos os direitos reservados</p>
      <div className="mt-3 flex justify-center gap-6">
        <Link href="/termos" className="hover:text-ink">Termos de uso</Link>
        <Link href="/privacidade" className="hover:text-ink">Privacidade</Link>
        <Link href="/reembolso" className="hover:text-ink">Reembolso</Link>
        <Link href="/contato" className="hover:text-ink">Contato</Link>
      </div>
    </footer>
  );
}

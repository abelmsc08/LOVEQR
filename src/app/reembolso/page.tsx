import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { ShieldCheck, Clock, MessageCircle, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Política de Reembolso — Meu QR Love",
  description: "Garantia de 7 dias. Saiba como solicitar reembolso no Meu QR Love.",
};

export default function Reembolso() {
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
        {/* Hero da garantia */}
        <div className="flex flex-col items-center rounded-3xl bg-gradient-to-br from-brand/5 to-brand/10 px-8 py-12 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand/10">
            <ShieldCheck className="h-10 w-10 text-brand" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-extrabold text-ink">Garantia de 7 dias</h1>
          <p className="mt-4 max-w-md text-lg text-muted">
            Se por qualquer motivo você não ficar satisfeito, devolvemos 100% do seu dinheiro.
            Sem perguntas, sem burocracia.
          </p>
        </div>

        {/* Cards de destaque */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Clock, title: "7 dias corridos", desc: "A partir da data da compra" },
            { icon: CheckCircle, title: "100% do valor", desc: "Reembolso integral garantido" },
            { icon: MessageCircle, title: "Resposta rápida", desc: "Em até 1 dia útil" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-black/5 bg-gray-50 p-5 text-center">
              <Icon className="mx-auto h-7 w-7 text-brand" />
              <p className="mt-3 font-display text-base font-bold text-ink">{title}</p>
              <p className="mt-1 text-sm text-muted">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-8">
          <Section title="Como solicitar o reembolso">
            <p>É simples e rápido. Siga os passos abaixo:</p>
            <ol className="mt-4 space-y-3">
              {[
                "Entre em contato pelo e-mail meuqrcodelove.contato@gmail.com ou WhatsApp (28) 99943-9891.",
                "Informe o nome utilizado na compra e o e-mail cadastrado.",
                'Envie o assunto "Reembolso" e descreva brevemente o motivo (opcional).',
                "Nossa equipe processará o reembolso em até 1 dia útil.",
                "O valor retorna para a mesma forma de pagamento utilizada na compra (Pix imediato; cartão em até 2 faturas).",
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-base leading-relaxed text-muted">{step}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Condições da garantia">
            <ul>
              <li>A solicitação deve ser feita em até 7 dias corridos após a data da compra.</li>
              <li>A garantia se aplica a todos os planos: Evento Especial, Delux, Aniversário e Poster de Filme.</li>
              <li>Não há restrição quanto ao motivo — se não ficou satisfeito, devolvemos.</li>
            </ul>
          </Section>

          <Section title="Contato para reembolso">
            <p>Prefere falar com a gente diretamente? Estamos aqui:</p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:meuqrcodelove.contato@gmail.com"
                className="flex items-center gap-2 rounded-xl border border-brand/20 bg-brand/5 px-5 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand/10"
              >
                ✉️ meuqrcodelove.contato@gmail.com
              </a>
              <a
                href="https://wa.me/5528999439891"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-sm font-semibold text-green-700 transition-colors hover:bg-green-100"
              >
                💬 WhatsApp (28) 99943-9891
              </a>
            </div>
          </Section>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      <div className="mt-3 text-base leading-relaxed text-muted [&_li]:ml-4 [&_li]:list-disc">
        {children}
      </div>
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

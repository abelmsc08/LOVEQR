import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Mail, MessageCircle, Clock, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "Contato — Meu QR Love",
  description: "Fale conosco pelo e-mail ou WhatsApp. Respondemos rapidamente!",
};

export default function Contato() {
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
        <div className="text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10">
            <HeartHandshake className="h-8 w-8 text-brand" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-extrabold text-ink">Fale com a gente</h1>
          <p className="mt-4 text-lg text-muted">
            Estamos aqui para ajudar. Escolha o canal que preferir — respondemos rapidamente!
          </p>
        </div>

        {/* Cards de contato */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <a
            href="mailto:meuqrcodelove.contato@gmail.com"
            className="group flex flex-col gap-4 rounded-3xl border border-black/5 bg-gray-50 p-8 transition-all hover:border-brand/20 hover:bg-brand/5"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 transition-colors group-hover:bg-brand/15">
              <Mail className="h-7 w-7 text-brand" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-ink">E-mail</h2>
              <p className="mt-1 text-sm text-muted">Para dúvidas, suporte e reembolsos</p>
              <p className="mt-3 font-semibold text-brand break-all">
                meuqrcodelove.contato@gmail.com
              </p>
            </div>
            <p className="mt-auto flex items-center gap-1.5 text-xs text-muted">
              <Clock className="h-3.5 w-3.5" />
              Resposta em até 1 dia útil
            </p>
          </a>

          <a
            href="https://wa.me/5528999439891"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-4 rounded-3xl border border-black/5 bg-gray-50 p-8 transition-all hover:border-green-200 hover:bg-green-50"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 transition-colors group-hover:bg-green-200">
              <MessageCircle className="h-7 w-7 text-green-600" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-ink">WhatsApp</h2>
              <p className="mt-1 text-sm text-muted">Atendimento rápido e direto</p>
              <p className="mt-3 font-semibold text-green-700">(28) 99943-9891</p>
            </div>
            <p className="mt-auto flex items-center gap-1.5 text-xs text-muted">
              <Clock className="h-3.5 w-3.5" />
              Atendimento de seg. a sáb., 9h–18h
            </p>
          </a>
        </div>

        {/* FAQ rápido */}
        <div className="mt-14">
          <h2 className="font-display text-2xl font-bold text-ink">Perguntas frequentes</h2>
          <div className="mt-6 space-y-4">
            {[
              {
                q: "Não recebi o link da minha página, o que faço?",
                a: "O link é gerado imediatamente após a confirmação do pagamento. Se não recebeu, entre em contato informando o e-mail ou CPF usado na compra.",
              },
              {
                q: "Posso editar a página depois de criada?",
                a: "No momento, as páginas são geradas com o conteúdo inserido no momento da criação. Para alterações, entre em contato com nosso suporte.",
              },
              {
                q: "Como funciona o reembolso?",
                a: "Oferecemos reembolso integral em até 7 dias corridos após a compra. Basta nos contatar pelo e-mail ou WhatsApp acima.",
              },
              {
                q: "O Pix cai na hora?",
                a: "Sim! Após a confirmação do Pix, a sua página é liberada automaticamente em segundos.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-black/5 bg-gray-50 p-5">
                <p className="font-semibold text-ink">{q}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a}</p>
              </div>
            ))}
          </div>
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

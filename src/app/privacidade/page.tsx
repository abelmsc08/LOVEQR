import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export const metadata = {
  title: "Política de Privacidade — Meu QR Love",
  description: "Saiba como coletamos, usamos e protegemos seus dados pessoais.",
};

export default function Privacidade() {
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
        <h1 className="font-display text-4xl font-extrabold text-ink">Política de Privacidade</h1>
        <p className="mt-2 text-sm text-muted">Última atualização: julho de 2026</p>

        <div className="prose prose-lg mt-10 text-ink">
          <Section title="1. Quem somos">
            <p>
              O <strong>Meu QR Love</strong> é um serviço online que permite criar páginas personalizadas com fotos, mensagens e músicas,
              disponibilizadas por meio de um QR Code exclusivo. Operamos em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
            </p>
          </Section>

          <Section title="2. Dados que coletamos">
            <ul>
              <li><strong>Dados fornecidos por você:</strong> nome, e-mail e CPF (apenas para pagamento via cartão), fotos e mensagens inseridas na criação da página.</li>
              <li><strong>Dados de pagamento:</strong> processados diretamente pelo MercadoPago — não armazenamos dados de cartão em nossos servidores.</li>
              <li><strong>Dados de navegação:</strong> endereço IP, tipo de dispositivo, páginas visitadas, coletados automaticamente via cookies e ferramentas analíticas (Microsoft Clarity, Meta Pixel).</li>
            </ul>
          </Section>

          <Section title="3. Como usamos seus dados">
            <ul>
              <li>Criar e entregar a página personalizada que você contratou.</li>
              <li>Processar e confirmar pagamentos.</li>
              <li>Melhorar a experiência do site e corrigir erros.</li>
              <li>Enviar comunicações relacionadas ao seu pedido (confirmação, entrega do QR Code).</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </Section>

          <Section title="4. Compartilhamento de dados">
            <p>
              Não vendemos seus dados. Compartilhamos informações somente com:
            </p>
            <ul>
              <li><strong>MercadoPago:</strong> para processar pagamentos com segurança.</li>
              <li><strong>Vercel / Supabase:</strong> infraestrutura de hospedagem e banco de dados.</li>
              <li><strong>Microsoft Clarity e Meta:</strong> ferramentas analíticas para entender o comportamento dos visitantes.</li>
            </ul>
          </Section>

          <Section title="5. Cookies">
            <p>
              Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos para melhorar a experiência.
              Você pode desativar cookies analíticos nas configurações do seu navegador.
            </p>
          </Section>

          <Section title="6. Retenção de dados">
            <p>
              Suas páginas criadas ficam disponíveis pelo prazo contratado. Dados de pagamento são retidos pelo período exigido pela legislação fiscal brasileira (5 anos).
            </p>
          </Section>

          <Section title="7. Seus direitos (LGPD)">
            <p>Você tem direito a:</p>
            <ul>
              <li>Acessar os dados que temos sobre você.</li>
              <li>Corrigir dados incorretos ou desatualizados.</li>
              <li>Solicitar a exclusão de seus dados.</li>
              <li>Revogar consentimento a qualquer momento.</li>
            </ul>
            <p>
              Para exercer seus direitos, entre em contato pelo e-mail{" "}
              <a href="mailto:meuqrcodelove.contato@gmail.com" className="text-brand underline">
                meuqrcodelove.contato@gmail.com
              </a>.
            </p>
          </Section>

          <Section title="8. Segurança">
            <p>
              Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo HTTPS em todas as comunicações e
              restrições de acesso aos bancos de dados.
            </p>
          </Section>

          <Section title="9. Alterações nesta política">
            <p>
              Podemos atualizar esta política periodicamente. Publicaremos a nova versão nesta página com a data de atualização.
            </p>
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-muted [&_a]:text-brand [&_li]:ml-4 [&_li]:list-disc [&_strong]:text-ink">
        {children}
      </div>
    </div>
  );
}

function Footer() {
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

import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export const metadata = {
  title: "Termos de Uso — Meu QR Love",
  description: "Leia os termos e condições de uso do Meu QR Love.",
};

export default function Termos() {
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
        <h1 className="font-display text-4xl font-extrabold text-ink">Termos de Uso</h1>
        <p className="mt-2 text-sm text-muted">Última atualização: julho de 2026</p>

        <div className="mt-10 space-y-8">
          <Section title="1. Aceitação dos termos">
            <p>
              Ao utilizar o <strong>Meu QR Love</strong>, você concorda com estes Termos de Uso. Se não concordar,
              não utilize o serviço. Estes termos se aplicam a todos os visitantes, usuários e contratantes do serviço.
            </p>
          </Section>

          <Section title="2. O serviço">
            <p>
              O Meu QR Love permite criar páginas digitais personalizadas com fotos, mensagens, contagem de tempo e música,
              acessíveis por meio de um QR Code exclusivo. O serviço é prestado mediante pagamento único, conforme o plano escolhido.
            </p>
          </Section>

          <Section title="3. Cadastro e responsabilidade">
            <ul>
              <li>Você é responsável pela veracidade dos dados informados durante a compra.</li>
              <li>O acesso à sua página é feito pelo link exclusivo gerado após o pagamento — guarde-o com segurança.</li>
              <li>É proibido usar o serviço para fins ilegais, difamatórios, pornográficos ou que violem direitos de terceiros.</li>
            </ul>
          </Section>

          <Section title="4. Conteúdo do usuário">
            <p>
              Você declara que possui todos os direitos sobre as fotos, músicas e textos inseridos na sua página.
              O Meu QR Love não se responsabiliza por conteúdos enviados pelos usuários e reserva-se o direito de
              remover páginas que violem estes termos sem aviso prévio.
            </p>
          </Section>

          <Section title="5. Pagamento">
            <ul>
              <li>Os pagamentos são processados com segurança pelo MercadoPago (Pix ou cartão de crédito).</li>
              <li>A liberação da página ocorre automaticamente após a confirmação do pagamento.</li>
              <li>Os preços exibidos incluem todos os impostos aplicáveis.</li>
            </ul>
          </Section>

          <Section title="6. Vigência da página">
            <ul>
              <li><strong>Plano Evento Especial:</strong> página disponível por 1 mês.</li>
              <li><strong>Plano Delux:</strong> página disponível por 1 ano.</li>
              <li><strong>Cartão de Aniversário:</strong> página disponível por 1 mês.</li>
              <li><strong>Poster de Filme:</strong> página disponível por 2 anos.</li>
            </ul>
            <p>Após o prazo, a página poderá ser desativada sem aviso prévio.</p>
          </Section>

          <Section title="7. Política de reembolso">
            <p>
              Oferecemos reembolso integral em até 7 dias corridos após a compra, desde que a página não tenha sido compartilhada
              com o destinatário. Consulte nossa{" "}
              <Link href="/reembolso" className="text-brand underline">
                política de reembolso completa
              </Link>.
            </p>
          </Section>

          <Section title="8. Limitação de responsabilidade">
            <p>
              O Meu QR Love não garante disponibilidade ininterrupta do serviço. Em casos de falha técnica, envidamos
              todos os esforços para restaurar o serviço no menor tempo possível. Nossa responsabilidade está limitada
              ao valor pago pelo serviço contratado.
            </p>
          </Section>

          <Section title="9. Propriedade intelectual">
            <p>
              Todo o design, código-fonte, logotipos e textos do Meu QR Love são propriedade exclusiva da empresa.
              É vedada a cópia, reprodução ou redistribuição sem autorização expressa.
            </p>
          </Section>

          <Section title="10. Alterações">
            <p>
              Podemos alterar estes termos a qualquer momento. Publicaremos a versão atualizada nesta página.
              O uso contínuo do serviço após alterações implica aceitação dos novos termos.
            </p>
          </Section>

          <Section title="11. Foro">
            <p>
              Fica eleito o foro da comarca de domicílio do usuário para dirimir quaisquer controvérsias decorrentes destes termos,
              nos termos do Código de Defesa do Consumidor (Lei nº 8.078/1990).
            </p>
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
      <div className="mt-3 space-y-3 text-base leading-relaxed text-muted [&_a]:text-brand [&_li]:ml-4 [&_li]:list-disc [&_strong]:text-ink">
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

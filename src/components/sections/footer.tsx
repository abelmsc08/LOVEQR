import { Heart, Camera, Users, Play } from "lucide-react";

const columns = [
  {
    title: "Produto",
    links: ["Como funciona", "Modelos", "Preços", "Exemplos"],
  },
  {
    title: "Empresa",
    links: ["Sobre nós", "Depoimentos", "FAQ", "Contato"],
  },
  {
    title: "Legal",
    links: ["Termos de uso", "Privacidade", "Reembolso"],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 font-display text-lg font-bold text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand">
                <Heart className="h-4 w-4 fill-white text-white" />
              </span>
              Meu QR Love
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Transforme sua história de amor em uma lembrança eterna.
            </p>
            <div className="mt-6 flex gap-3">
              {[Camera, Users, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-white/30 hover:text-white"
                  aria-label="Rede social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-white">
                {col.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} Meu QR Love. Todos os direitos reservados.</p>
          <p>Feito com ❤️ para histórias que merecem durar para sempre.</p>
        </div>
      </div>
    </footer>
  );
}

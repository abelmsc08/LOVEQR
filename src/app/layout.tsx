import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meu QR Love — Transforme sua história de amor em uma lembrança eterna",
  description:
    "Crie uma página personalizada e romântica com fotos, música e uma carta especial. Receba um QR Code exclusivo para presentear quem você ama.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${jakarta.variable} ${inter.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect para fontes Google — elimina round-trip no carregamento */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload das imagens hero — acima da dobra, carrega com prioridade */}
        <link
          rel="preload"
          as="image"
          href="/publichero-bg-mobile.webp"
          type="image/webp"
          media="(max-width: 767px)"
        />
        <link
          rel="preload"
          as="image"
          href="/publichero-bg-desktop.webp"
          type="image/webp"
          media="(min-width: 768px)"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-ink">{children}</body>
    </html>
  );
}

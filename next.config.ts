import type { NextConfig } from "next";

const securityHeaders = [
  // Impede que a página seja embutida em iframes (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Impede MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Referrer só em mesma origem
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Força HTTPS por 1 ano, inclui subdomínios
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  // Limita APIs do browser desnecessárias
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // CSP: restringe origens de scripts, estilos e media
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js precisa de 'unsafe-inline' para estilos inline e 'unsafe-eval' em dev
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://sdk.mercadopago.com https://www.youtube.com https://www.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://i.ytimg.com https://img.youtube.com https://lh3.googleusercontent.com",
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
      "connect-src 'self' https://www.googleapis.com https://api.mercadopago.com",
      "media-src 'self' https://www.youtube.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

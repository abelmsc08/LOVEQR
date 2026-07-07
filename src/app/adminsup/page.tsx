"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { themes } from "@/lib/themes";

const PASSWORD = "qrlove@sup2026";

const PLANS = [
  { id: "evento", label: "Evento Especial (1 mês)" },
  { id: "delux", label: "Delux (1 ano)" },
  { id: "aniversario", label: "Cartão de Aniversário (1 mês)" },
  { id: "poster", label: "Poster de Filme (2 anos)" },
];

const DELIVERY_BASE =
  process.env.NEXT_PUBLIC_PAGES_URL ?? "https://entregalovepriv-eout.vercel.app";

export default function AdminSup() {
  const [pass, setPass] = useState("");
  const [auth, setAuth] = useState(false);
  const [passErr, setPassErr] = useState(false);

  // form
  const [planId, setPlanId] = useState("delux");
  const [names, setNames] = useState("");
  const [message, setMessage] = useState("");
  const [since, setSince] = useState("");
  const [themeId, setThemeId] = useState("classico");
  const [songVideoId, setSongVideoId] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [musicAddOn, setMusicAddOn] = useState(true);
  const [confettiEffect, setConfettiEffect] = useState(true);
  const [openImmediately, setOpenImmediately] = useState(true);
  const [openDate, setOpenDate] = useState("");
  // aniversario
  const [title, setTitle] = useState("");
  const [surpresaPara, setSurpresaPara] = useState("");
  // poster
  const [movieTitle, setMovieTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [cinemaMessage, setCinemaMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ slug: string; qrDataUrl: string } | null>(null);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pass === PASSWORD) {
      setAuth(true);
    } else {
      setPassErr(true);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const body = {
        planId,
        names,
        message,
        since,
        themeId,
        title,
        surpresaPara,
        openDate: openImmediately ? "" : openDate,
        openImmediately,
        confettiEffect,
        songTitle,
        songArtist,
        songThumbnail: "",
        songVideoId,
        songStartSeconds: 0,
        musicAddOn,
        photos: [],
        movieTitle,
        tagline,
        synopsis,
        showDateOnPoster: true,
        cinemaMessage,
        cinemaPhotos: [],
      };

      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok || !json.slug) throw new Error(json.error ?? "Erro ao criar página");

      const pageUrl = `${DELIVERY_BASE}/${json.slug}`;
      const qrDataUrl = await QRCode.toDataURL(pageUrl, { width: 300, margin: 2 });

      setResult({ slug: json.slug, qrDataUrl });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  if (!auth) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-[#1e293b] rounded-2xl p-8 shadow-2xl space-y-4">
          <h1 className="text-white text-2xl font-bold text-center">🔐 Admin</h1>
          <p className="text-white/50 text-sm text-center">Área restrita — QR Love</p>
          <input
            type="password"
            placeholder="Senha"
            value={pass}
            onChange={e => { setPass(e.target.value); setPassErr(false); }}
            className="w-full bg-[#0f172a] text-white rounded-lg px-4 py-3 outline-none border border-white/10 focus:border-red-500"
          />
          {passErr && <p className="text-red-400 text-sm">Senha incorreta.</p>}
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  const pageUrl = result ? `${DELIVERY_BASE}/${result.slug}` : "";

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">🛠️ Admin — Criar Página Grátis</h1>
          <span className="text-white/30 text-xs">qrlove@sup</span>
        </div>

        {result ? (
          <div className="bg-[#1e293b] rounded-2xl p-8 space-y-6 text-center">
            <div className="text-4xl">✅</div>
            <h2 className="text-xl font-bold">Página criada!</h2>
            <p className="text-white/60 text-sm break-all">{pageUrl}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={result.qrDataUrl} alt="QR Code" className="mx-auto rounded-xl" />
            <div className="flex flex-col gap-3">
              <a
                href={pageUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition block"
              >
                Abrir página →
              </a>
              <button
                onClick={() => {
                  const win = window.open("", "_blank");
                  if (!win) return;
                  win.document.write(`<!DOCTYPE html><html><head><title>QR Code — ${result.slug}</title><style>body{margin:0;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:Arial,sans-serif;background:#fff}h2{margin-bottom:16px;color:#111}p{color:#555;font-size:14px;margin-bottom:24px}img{border-radius:12px}@media print{button{display:none}}</style></head><body><h2>QR Code — ${result.slug}</h2><p>${pageUrl}</p><img src="${result.qrDataUrl}" width="280"/><br/><br/><button onclick="window.print()" style="padding:10px 24px;background:#b91c1c;color:#fff;border:none;border-radius:8px;font-size:15px;cursor:pointer">Imprimir / Salvar PDF</button></body></html>`);
                  win.document.close();
                }}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-lg transition"
              >
                Baixar PDF com QR Code
              </button>
              <button
                onClick={() => setResult(null)}
                className="text-white/40 hover:text-white text-sm transition"
              >
                Criar outra página
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCreate} className="bg-[#1e293b] rounded-2xl p-8 space-y-6">

            {/* Plano */}
            <div>
              <label className="block text-sm text-white/60 mb-2">Plano</label>
              <div className="grid grid-cols-2 gap-2">
                {PLANS.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlanId(p.id)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium border transition ${planId === p.id ? "bg-red-600 border-red-600 text-white" : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Campos comuns */}
            {planId !== "aniversario" && planId !== "poster" && (
              <Field label="Nome do casal" value={names} onChange={setNames} placeholder="Ana & Pedro" required />
            )}

            {planId === "aniversario" && (
              <>
                <Field label="Título da mensagem" value={title} onChange={setTitle} placeholder="Feliz Aniversário, Maria!" required />
                <Field label="Nome do presenteado" value={surpresaPara} onChange={setSurpresaPara} placeholder="Maria" />
                <Field label="Nomes (para o slug)" value={names} onChange={setNames} placeholder="Ana para Maria" />
              </>
            )}

            {planId === "poster" && (
              <>
                <Field label="Título do filme" value={movieTitle} onChange={setMovieTitle} placeholder="Amor Infinito" required />
                <Field label="Tagline" value={tagline} onChange={setTagline} placeholder="Uma história que durou para sempre" />
                <TextArea label="Sinopse" value={synopsis} onChange={setSynopsis} placeholder="Era uma tarde de outubro quando..." />
                <Field label="Mensagem de cinema" value={cinemaMessage} onChange={setCinemaMessage} placeholder="Para o amor da minha vida..." />
                <Field label="Nomes (para o slug)" value={names} onChange={setNames} placeholder="Ana & Pedro" />
              </>
            )}

            <TextArea label="Mensagem" value={message} onChange={setMessage} placeholder="Você mudou minha vida..." required />

            <Field label={planId === "aniversario" ? "Data do aniversário" : "Data de início do relacionamento"} value={since} onChange={setSince} type="date" />

            {/* Tema */}
            <div>
              <label className="block text-sm text-white/60 mb-2">Tema</label>
              <div className="flex flex-wrap gap-2">
                {themes.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setThemeId(t.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm border transition ${themeId === t.id ? "border-red-500 bg-red-600/20" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                  >
                    <span className="w-3 h-3 rounded-full" style={{ background: t.gradientFrom }} />
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Música */}
            <div className="space-y-2">
              <label className="block text-sm text-white/60">Música (YouTube ID — opcional)</label>
              <Field label="" value={songVideoId} onChange={setSongVideoId} placeholder="dQw4w9WgXcQ" />
              <div className="grid grid-cols-2 gap-2">
                <Field label="" value={songTitle} onChange={setSongTitle} placeholder="Nome da música" />
                <Field label="" value={songArtist} onChange={setSongArtist} placeholder="Artista" />
              </div>
              <Toggle label="Música ativa" value={musicAddOn} onChange={setMusicAddOn} />
            </div>

            {/* Efeitos */}
            <div className="space-y-2">
              <Toggle label="Confetes ao abrir" value={confettiEffect} onChange={setConfettiEffect} />
              <Toggle label="Abrir imediatamente" value={openImmediately} onChange={setOpenImmediately} />
              {!openImmediately && (
                <Field label="Data de abertura" value={openDate} onChange={setOpenDate} type="date" />
              )}
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-4 rounded-xl transition text-lg"
            >
              {loading ? "Criando..." : "✨ Criar Página Grátis"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text", required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      {label && <label className="block text-sm text-white/60 mb-1">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-[#0f172a] text-white rounded-lg px-4 py-3 outline-none border border-white/10 focus:border-red-500 placeholder:text-white/30"
      />
    </div>
  );
}

function TextArea({
  label, value, onChange, placeholder, required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm text-white/60 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={3}
        className="w-full bg-[#0f172a] text-white rounded-lg px-4 py-3 outline-none border border-white/10 focus:border-red-500 placeholder:text-white/30 resize-none"
      />
    </div>
  );
}

function Toggle({
  label, value, onChange,
}: {
  label: string; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition"
    >
      <span className={`w-10 h-6 rounded-full transition-colors ${value ? "bg-red-600" : "bg-white/20"} relative flex items-center`}>
        <span className={`absolute w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? "translate-x-5" : "translate-x-1"}`} />
      </span>
      {label}
    </button>
  );
}

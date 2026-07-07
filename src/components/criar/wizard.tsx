"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardCopy,
  CreditCard,
  ImageOff,
  Loader2,
  Music2,
  PartyPopper,
  QrCode,
  Sparkles,
  Wand2,
} from "lucide-react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/criar/step-indicator";
import { PreviewPhone } from "@/components/criar/preview-phone";
import { DeluxPreviewPhone } from "@/components/criar/delux-preview-phone";
import { AniversarioPreviewPhone } from "@/components/criar/aniversario-preview-phone";
import { PosterPreviewPhone } from "@/components/criar/poster-preview-phone";
import { DateCalendar } from "@/components/criar/date-calendar";
import { SongPicker, type YoutubeSong } from "@/components/criar/song-picker";
import { RecipientCardPreview } from "@/components/criar/recipient-card-preview";
import { Logo } from "@/components/ui/logo";
import { PhotoUploader, type Photo } from "@/components/criar/photo-uploader";
import { getPlan, formatBRL, planHasMusic, MUSIC_ADDON_PRICE } from "@/lib/plans";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

type FormData = {
  recipientName: string;
  names: string;
  message: string;
  since: string;
  title: string;
  surpresaPara: string;
  openDate: string;
  openImmediately: boolean;
  confettiEffect: boolean;
  songTitle: string;
  songArtist: string;
  songThumbnail: string;
  songVideoId: string;
  songStartSeconds: number;
  photos: Photo[];
  themeId: string;
  musicAddOn: boolean;
  noMusic: boolean;
  // Poster de Filme
  movieTitle: string;
  tagline: string;
  synopsis: string;
  showDateOnPoster: boolean;
  cinemaMessage: string;
  cinemaPhotos: Photo[];
};

const aniversarioAccentEmoji: Record<string, string> = {
  surpresa: "🎁",
  titulo: "🎂",
  mensagem: "🎂",
  data: "🎂",
  efeitos: "🎉",
};

const paraQuemStep = {
  id: "para-quem",
  title: "Para quem é o presente?",
  description: "Digite o nome de quem vai receber esse presente especial.",
};

const aniversarioSteps = [
  paraQuemStep,
  {
    id: "surpresa",
    title: "Tela de Surpresa",
    description: "Esta é a primeira tela que a pessoa verá ao abrir o link — personalize para quem é o presente.",
  },
  {
    id: "titulo",
    title: "Título da Mensagem",
    description: "Personalize o título da sua mensagem de aniversário.",
  },
  {
    id: "mensagem",
    title: "Mensagem de Aniversário",
    description: "Escreva uma mensagem especial de aniversário.",
  },
  {
    id: "data",
    title: "Data do Aniversário",
    description: "Selecione a data em que o presente poderá ser aberto.",
  },
  {
    id: "fotos",
    title: "Fotos marcantes",
    description: "Escolha até 10 fotos para deixar seu presente ainda mais especial.",
  },
  {
    id: "musica",
    title: "Selecione uma música",
    description:
      "Escolha uma música que represente o essencial da sua história. Pode ser a que marcou um momento especial ou que transmite os sentimentos que você compartilha. Deixe a trilha sonora falar por você! 🎵",
  },
  {
    id: "efeitos",
    title: "Efeitos Especiais",
    description: "Escolha os efeitos que aparecerão quando o presente for aberto.",
  },
  {
    id: "revisao",
    title: "Revisão e pagamento",
    description: "Confira tudo antes de finalizar seu presente.",
  },
];

const posterSteps = [
  paraQuemStep,
  {
    id: "titulo-filme",
    title: "Título do Filme",
    description: "Crie o título épico da história de vocês.",
  },
  {
    id: "sinopse",
    title: "Sinopse",
    description: "Escreva a sinopse da sua história de amor, como nos filmes de verdade. 🎬",
  },
  {
    id: "fotos",
    title: "Poster do Filme",
    description: "Escolha até 10 fotos para o seu poster. A primeira será exibida como capa.",
  },
  {
    id: "data",
    title: "Data especial",
    description: "Escolha o dia em que a história de vocês começou.",
  },
  {
    id: "musica",
    title: "Trilha sonora",
    description: "Escolha a música tema da sua história de amor. 🎵",
  },
  {
    id: "cinema-mensagem",
    title: "Mensagem do Cinema",
    description: "Escreva a frase que aparece quando o lead clicar em Assistir. 🎬",
  },
  {
    id: "revisao",
    title: "Revisão e pagamento",
    description: "Confira tudo antes de finalizar seu poster.",
  },
];

const cinemaMensagemIdeas = [
  "Cada frame dessa história foi escrito com amor.",
  "Duas almas, uma história que vale cada cena.",
  "O tempo passou, mas o amor escrito em cada foto ficou.",
  "Nossa história merecia um filme. Aqui está ele.",
  "Se o amor fosse um filme, nós seríamos os protagonistas.",
];

const posterTaglineIdeas = [
  "Uma história que o tempo não apaga.",
  "Dois corações, um destino.",
  "O amor que nenhum roteiro poderia imaginar.",
  "Baseado em uma história real de amor.",
  "O maior filme da nossa vida.",
];

const defaultSteps = [
  paraQuemStep,
  {
    id: "nome",
    title: "Nome do casal",
    description: "Este nome será exibido no topo da página.",
  },
  {
    id: "mensagem",
    title: "Mensagem",
    description:
      "Crie uma mensagem única e afetiva. Deixe sua criatividade falar mais alto e mostre todo o seu carinho de uma forma especial! 💖",
  },
  {
    id: "data",
    title: "Data especial",
    description: "Escolha o dia em que a história de vocês começou.",
  },
  {
    id: "fotos",
    title: "Fotos marcantes",
    description: "Escolha até 10 fotos para deixar sua página ainda mais especial.",
  },
  {
    id: "cores",
    title: "Escolha uma paleta de cores",
    description: "Selecione a paleta que melhor combina com a sua história. 🎨",
  },
  {
    id: "musica",
    title: "Selecione uma música",
    description:
      "Escolha a trilha sonora da sua história. Pode ser aquela música do primeiro encontro ou a que sempre lembra vocês dois. 🎵",
  },
  {
    id: "revisao",
    title: "Revisão e pagamento",
    description: "Confira tudo antes de finalizar sua página.",
  },
];

const messageIdeas = [
  "Estar ao seu lado é como viver em um sonho do qual eu nunca quero acordar. Seu sorriso ilumina meu mundo e seu amor transforma minha vida.",
  "Você é a prova de que o amor de verdade existe. Cada dia ao seu lado é um presente que eu guardo com todo o meu carinho.",
  "Com você aprendi que a vida fica mais leve, mais bonita e mais feliz. Obrigado por escolher caminhar comigo.",
  "Meu lugar favorito no mundo é onde você está. Que a gente continue escrevendo essa história linda, juntos.",
  "Você é o motivo do meu sorriso mais bobo e do meu coração mais tranquilo. Te amo mais a cada dia.",
];

const birthdayMessageIdeas = [
  "Que seu novo ano de vida seja repleto de alegrias, conquistas e muitos motivos para sorrir. Feliz aniversário!",
  "Hoje o dia é seu! Que venham muitas felicidades, saúde e realizações. Parabéns!",
  "Cada ano ao seu lado é um presente. Que este novo ciclo traga ainda mais amor e momentos inesquecíveis.",
  "Feliz aniversário! Que a vida continue te presenteando com tudo de bom que você merece.",
  "Parabéns por mais um ano de vida! Que seus sonhos se realizem e seu coração esteja sempre em festa.",
];

type Step = { id: string; title: string; description: string };

function isStepValid(
  stepId: string,
  data: FormData,
  musicIncluded: boolean,
  isAniversario: boolean,
  isPoster: boolean
) {
  switch (stepId) {
    case "para-quem":
      return data.recipientName.trim().length > 0;
    case "nome":
      return data.names.trim().length > 0;
    case "surpresa":
      return true;
    case "titulo":
      return data.title.trim().length > 0;
    case "titulo-filme":
      return data.movieTitle.trim().length > 0;
    case "sinopse":
      return data.synopsis.trim().length > 0;
    case "mensagem":
      return data.message.trim().length > 0;
    case "data":
      return isAniversario
        ? data.openImmediately || data.openDate.trim().length > 0
        : data.since.trim().length > 0;
    case "musica":
      if (isPoster) return true; // música opcional no poster
      if (isAniversario) return data.noMusic || data.songTitle.trim().length > 0;
      if (!musicIncluded && !data.musicAddOn) return true;
      return data.songTitle.trim().length > 0;
    default:
      return true;
  }
}

export function Wizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = getPlan(searchParams.get("plano") ?? undefined);
  const planId = plan.id;
  const musicIncluded = planHasMusic(plan);
  const isAniversario = planId === "aniversario";
  const isPoster = planId === "poster";
  const steps: Step[] = isAniversario ? aniversarioSteps : isPoster ? posterSteps : defaultSteps;

  // Load MercadoPago JS SDK for card tokenization
  useEffect(() => {
    if (document.querySelector('script[src*="sdk.mercadopago.com"]')) return;
    const s = document.createElement("script");
    s.src = "https://sdk.mercadopago.com/js/v2";
    document.head.appendChild(s);
  }, []);

  const [step, setStep] = useState<number>(() => {
    try {
      const raw = localStorage.getItem("qrlove_draft");
      if (!raw) return 0;
      const draft = JSON.parse(raw) as { planId?: string; step?: number };
      if (draft.planId === planId) return draft.step ?? 0;
    } catch { /* ignore */ }
    return 0;
  });
  const [submitting, setSubmitting] = useState(false);
  const [pageSlug, setPageSlug] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [showPhotoConfirm, setShowPhotoConfirm] = useState(false);

  // Payment state
  const [paymentTab, setPaymentTab] = useState<"pix" | "card">("pix");
  const [pixData, setPixData] = useState<{ id: number; qr_code: string; qr_code_base64: string; expiry: string } | null>(null);
  const [pixCopied, setPixCopied] = useState(false);
  const [pixPolling, setPixPolling] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardCpf, setCardCpf] = useState("");
  const [cardEmail, setCardEmail] = useState("");
  const [cardError, setCardError] = useState("");
  const [cinemaModePreview, setCinemaModePreview] = useState(false);
  const [cinemaPrevIdx, setCinemaPrevIdx] = useState(0);
  const [data, setData] = useState<FormData>(() => {
    const defaults: FormData = {
      recipientName: "",
      names: "",
      message: "",
      since: "",
      title: "",
      surpresaPara: "",
      openDate: "",
      openImmediately: false,
      confettiEffect: true,
      songTitle: "",
      songArtist: "",
      songThumbnail: "",
      songVideoId: "",
      songStartSeconds: 0,
      photos: [],
      themeId: themes[0].id,
      musicAddOn: false,
      noMusic: false,
      movieTitle: "",
      tagline: "",
      synopsis: "",
      showDateOnPoster: true,
      cinemaMessage: "",
      cinemaPhotos: [],
    };
    try {
      const raw = localStorage.getItem("qrlove_draft");
      if (!raw) return defaults;
      const draft = JSON.parse(raw);
      if (draft.planId === planId && draft.data) return { ...defaults, ...draft.data };
    } catch { /* ignore */ }
    return defaults;
  });

  useEffect(() => {
    if (!cinemaModePreview || data.cinemaPhotos.length <= 1) return;
    const id = setInterval(() => {
      setCinemaPrevIdx((i) => (i + 1) % data.cinemaPhotos.length);
    }, 2000);
    return () => clearInterval(id);
  }, [cinemaModePreview, data.cinemaPhotos.length]);

  const total = plan.price + (!musicIncluded && data.musicAddOn ? MUSIC_ADDON_PRICE : 0);

  const update = (patch: Partial<FormData>) => setData((prev) => ({ ...prev, ...patch }));

  // Auto-save progress to localStorage (excluding large photo blobs)
  useEffect(() => {
    if (pageSlug) return; // page already created, don't save draft
    try {
      const draft = {
        planId,
        step,
        data: {
          ...data,
          photos: data.photos.filter((p) => p.url.startsWith("http")).map((p) => ({ id: p.id, url: p.url })),
          cinemaPhotos: data.cinemaPhotos.filter((p) => p.url.startsWith("http")).map((p) => ({ id: p.id, url: p.url })),
        },
      };
      localStorage.setItem("qrlove_draft", JSON.stringify(draft));
    } catch {
      // ignore quota errors
    }
  }, [data, step, planId, pageSlug]);

  const generateMessage = () => {
    const ideas = isAniversario ? birthdayMessageIdeas : messageIdeas;
    const options = ideas.filter((m) => m !== data.message);
    const pick = options[Math.floor(Math.random() * options.length)];
    update({ message: pick });
  };

  const generateTagline = () => {
    const options = posterTaglineIdeas.filter((t) => t !== data.tagline);
    const pick = options[Math.floor(Math.random() * options.length)];
    update({ tagline: pick });
  };

  const generateCinemaMessage = () => {
    const options = cinemaMensagemIdeas.filter((m) => m !== data.cinemaMessage);
    const pick = options[Math.floor(Math.random() * options.length)];
    update({ cinemaMessage: pick });
  };

  const selectSong = (song: YoutubeSong) =>
    update({
      songTitle: song.title,
      songArtist: song.artist,
      songThumbnail: song.thumbnail,
      songVideoId: song.videoId,
    });

  const selectedSong: YoutubeSong | null = data.songTitle
    ? {
        title: data.songTitle,
        artist: data.songArtist,
        thumbnail: data.songThumbnail,
        videoId: data.songVideoId,
      }
    : null;

  const currentStepId = steps[step].id;
  const valid = isStepValid(currentStepId, data, musicIncluded, isAniversario, isPoster);
  const isLast = step === steps.length - 1;

  const createPage = async () => {
    const res = await fetch("/api/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planId: plan.id,
        names: data.names,
        message: data.message,
        since: data.since,
        themeId: data.themeId,
        title: data.title,
        openDate: data.openDate,
        openImmediately: data.openImmediately,
        confettiEffect: data.confettiEffect,
        songTitle: data.songTitle,
        songArtist: data.songArtist,
        songThumbnail: data.songThumbnail,
        songVideoId: data.songVideoId,
        songStartSeconds: data.songStartSeconds,
        musicAddOn: data.musicAddOn,
        photos: data.photos.map((p) => p.url),
        movieTitle: data.movieTitle,
        tagline: data.tagline,
        synopsis: data.synopsis,
        showDateOnPoster: data.showDateOnPoster,
        cinemaMessage: data.cinemaMessage,
        cinemaPhotos: data.cinemaPhotos.map((p) => p.url),
      }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Erro ao criar página");
    const slug: string = json.slug;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? window.location.origin;
    const pageUrl = `${appUrl}/p/${slug}`;
    const qr = await QRCode.toDataURL(pageUrl, { width: 256, margin: 1 });
    setPageSlug(slug);
    setQrDataUrl(qr);
    try { localStorage.removeItem("qrlove_draft"); } catch { /* ignore */ }
  };

  const handlePixPay = async () => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/payment/pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, description: `QR Love – ${plan.name}` }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Erro ao gerar Pix");
      setPixData({
        id: json.id,
        qr_code: json.qr_code,
        qr_code_base64: json.qr_code_base64,
        expiry: json.date_of_expiration,
      });
      setPixPolling(true);
      // poll every 5s
      const interval = setInterval(async () => {
        try {
          const sr = await fetch(`/api/payment/status?id=${json.id}`);
          const sj = await sr.json();
          if (sj.status === "approved") {
            clearInterval(interval);
            setPixPolling(false);
            await createPage();
          }
        } catch { /* keep polling */ }
      }, 5000);
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar código Pix. Verifique as credenciais do MercadoPago.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCardPay = async () => {
    if (!cardNumber || !cardExpiry || !cardCvc || !cardName || !cardCpf || !cardEmail) return;
    setCardError("");
    setSubmitting(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      const mpKey = (process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string | undefined) ?? "";
      if (!win.MercadoPago || !mpKey) throw new Error("SDK do MercadoPago não carregado");

      const mp = new win.MercadoPago(mpKey, { locale: "pt-BR" });
      const [expMonth, expYear] = cardExpiry.replace(/\s/g, "").split("/");
      const cleanCpf = cardCpf.replace(/\D/g, "");

      const tokenResult = await mp.createCardToken({
        cardNumber: cardNumber.replace(/\s/g, ""),
        cardholderName: cardName,
        cardExpirationMonth: expMonth,
        cardExpirationYear: expYear.length === 2 ? `20${expYear}` : expYear,
        securityCode: cardCvc,
        identificationType: "CPF",
        identificationNumber: cleanCpf,
      });

      if (!tokenResult?.id) throw new Error("Falha ao gerar token do cartão");

      const res = await fetch("/api/payment/card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: tokenResult.id,
          amount: total,
          description: `QR Love – ${plan.name}`,
          installments: 1,
          email: cardEmail,
          identificationType: "CPF",
          identificationNumber: cleanCpf,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.detail ?? json.error ?? "Pagamento recusado");
      if (json.status === "approved") {
        await createPage();
      } else {
        const msg = json.status_detail === "cc_rejected_bad_filled_card_number"
          ? "Número do cartão inválido."
          : json.status_detail === "cc_rejected_bad_filled_date"
          ? "Data de validade inválida."
          : json.status_detail === "cc_rejected_bad_filled_security_code"
          ? "CVV inválido."
          : json.status_detail === "cc_rejected_insufficient_amount"
          ? "Saldo insuficiente no cartão."
          : "Pagamento não aprovado. Verifique os dados e tente novamente.";
        setCardError(msg);
      }
    } catch (err) {
      console.error("[card]", err);
      const msg = err instanceof Error ? err.message : "Erro ao processar cartão.";
      setCardError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const goNext = async () => {
    if (!valid) return;
    if (currentStepId === "fotos" && data.photos.length === 0) {
      setShowPhotoConfirm(true);
      return;
    }
    if (!isLast) {
      setStep((s) => s + 1);
      return;
    }
    // Last step — payment handled by buttons inside the revisao UI
  };

  const goBack = () => {
    if (step === 0) {
      router.push("/#planos");
      return;
    }
    setStep((s) => s - 1);
  };

  if (pageSlug) {
    const deliveryBase = process.env.NEXT_PUBLIC_PAGES_URL ?? "https://qr-love-pages.vercel.app";
    const pageUrl = `${deliveryBase}/${pageSlug}`;
    const displayName = data.names || data.title || data.movieTitle || "quem você ama";
    const recipientLabel = data.recipientName.trim() || displayName;

    const downloadPdf = () => {
      const win = window.open("", "_blank");
      if (!win) return;
      const recipient = data.recipientName.trim() || displayName;
      win.document.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <title>QR Love – ${recipient}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Georgia, serif; background: #fff; color: #111; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .card { width: 320px; border-radius: 24px; overflow: hidden; box-shadow: 0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10); }
    .bar-top { height: 8px; width: 100%; background: linear-gradient(to right, #dc2626, #f87171); }
    .bar-bottom { height: 4px; width: 100%; background: linear-gradient(to right, #f87171, #dc2626); }
    .content { display: flex; flex-direction: column; align-items: center; padding: 32px 32px; gap: 20px; }
    .heart-badge { display: flex; height: 48px; width: 48px; align-items: center; justify-content: center; border-radius: 9999px; background: #fef2f2; font-size: 24px; }
    .para-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; color: #9ca3af; margin-bottom: 4px; text-align: center; }
    .recipient-name { font-family: 'Brush Script MT', cursive; font-size: 28px; font-weight: bold; color: #111827; text-align: center; }
    .message { text-align: center; font-size: 14px; color: #6b7280; line-height: 1.6; }
    .qr-box { display: flex; flex-direction: column; align-items: center; gap: 8px; width: 100%; }
    .qr-box img { width: 160px; height: 160px; display: block; border-radius: 12px; }
    .qr-caption { font-size: 11px; color: #9ca3af; letter-spacing: 0.02em; text-align: center; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="card">
    <div class="bar-top"></div>
    <div class="content">
      <div class="heart-badge">❤️</div>
      <div>
        <p class="para-label">Para</p>
        <p class="recipient-name">${recipient}</p>
      </div>
      <p class="message">Uma surpresa especial<br/>espera por você.</p>
      <div class="qr-box">
        <img src="${qrDataUrl}" alt="QR Code"/>
        <p class="qr-caption">Escaneie com a câmera do celular</p>
      </div>
    </div>
    <div class="bar-bottom"></div>
  </div>
  <script>window.onload=()=>{ window.print(); }</script>
</body>
</html>`);
      win.document.close();
    };

    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex w-full max-w-md flex-col items-center text-center"
        >
          <Logo size={72} />
          <h1 className="mt-8 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Página criada com sucesso!
          </h1>
          <p className="mt-2 text-lg font-semibold text-white/50 tracking-widest uppercase">
            Para
          </p>
          <p
            className="text-3xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-dancing, cursive)" }}
          >
            {recipientLabel}
          </p>
          <p className="mt-3 max-w-sm text-white/60">
            Baixe o PDF com o QR Code e entregue para{" "}
            <span className="text-white font-semibold">{recipientLabel}</span>.
          </p>

          {qrDataUrl && (
            <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="QR Code" className="h-44 w-44 sm:h-52 sm:w-52" />
            </div>
          )}

          <div className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-center font-mono text-xs text-white/40 break-all">
            {pageUrl}
          </div>

          <div className="mt-6 flex w-full flex-col gap-3">
            <button
              type="button"
              onClick={downloadPdf}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand py-3.5 text-[15px] font-bold text-white shadow-[0_8px_30px_-6px_rgba(185,28,28,0.55)] transition-all hover:-translate-y-0.5"
            >
              ⬇ Baixar PDF com QR Code
            </button>
            <a
              href={pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10"
            >
              Abrir página do presenteado →
            </a>
          </div>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-6 text-sm text-white/30 hover:text-white/50"
          >
            Voltar ao início
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main
      className={cn(
        "relative min-h-screen overflow-hidden bg-ink px-6",
        isAniversario ? "pb-14 pt-4 sm:pt-6" : "py-14 sm:py-20"
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-brand/15 blur-[130px]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full max-w-xl">
          {!isAniversario && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
              <Sparkles className="h-3 w-3 text-brand-light" />
              {plan.name} · R$ {formatBRL(total)}
            </div>
          )}

          <StepIndicator total={steps.length} current={step} showNumbers={!isAniversario} />

          <AnimatePresence>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              {currentStepId === "musica" && !musicIncluded && !isAniversario && !isPoster ? (
                <>
                  <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    Torne esse momento ainda mais inesquecível{" "}
                    <span className="text-brand-light">💖</span>!{" "}
                    <span className="text-brand-light">
                      Adicione uma música por mais R$ {formatBRL(MUSIC_ADDON_PRICE)}
                    </span>
                  </h2>
                  {!data.musicAddOn && (
                    <p className="mt-2 text-sm text-white/50">
                      Novo valor total:{" "}
                      <span className="font-semibold text-white">
                        R$ {formatBRL(plan.price + MUSIC_ADDON_PRICE)}
                      </span>
                    </p>
                  )}
                </>
              ) : (
                <>
                  {(() => {
                    const accent = isAniversario ? aniversarioAccentEmoji[steps[step].id] : undefined;
                    return (
                      <h2
                        className={cn(
                          "font-display text-2xl font-bold sm:text-3xl",
                          accent ? "text-pink-500" : "text-white"
                        )}
                      >
                        {accent ? `${accent} ${steps[step].title} ${accent}` : steps[step].title}
                      </h2>
                    );
                  })()}
                  <p className="mt-2 text-sm text-white/50">{steps[step].description}</p>
                </>
              )}

              <div className="mt-8">
                {currentStepId === "titulo-filme" && (
                  <div className="flex flex-col gap-4">
                    <input
                      autoFocus
                      value={data.movieTitle}
                      onChange={(e) => update({ movieTitle: e.target.value })}
                      placeholder="Nossa História de Amor"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand"
                    />
                    <div>
                      <label className="mb-1.5 block text-xs text-white/50">
                        Tagline (opcional)
                      </label>
                      <input
                        value={data.tagline}
                        onChange={(e) => update({ tagline: e.target.value })}
                        placeholder="Uma história que o tempo não apaga."
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand"
                      />
                      <p className="mt-1.5 text-[11px] text-white/30">
                        💡 A tagline aparece logo abaixo do título, como nos filmes de verdade
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={generateTagline}
                      className="flex w-fit items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-6px_rgba(185,28,28,0.55)] transition-transform hover:-translate-y-0.5"
                    >
                      <Wand2 className="h-4 w-4" />
                      Gerar tagline com IA
                    </button>
                  </div>
                )}

                {currentStepId === "sinopse" && (
                  <div className="flex flex-col gap-4">
                    <textarea
                      autoFocus
                      value={data.synopsis}
                      onChange={(e) => update({ synopsis: e.target.value })}
                      placeholder="Uma história de amor que começou por acaso e transformou tudo..."
                      rows={6}
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand"
                    />
                    <button
                      type="button"
                      onClick={generateMessage}
                      className="flex w-fit items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-6px_rgba(185,28,28,0.55)] transition-transform hover:-translate-y-0.5"
                    >
                      <Wand2 className="h-4 w-4" />
                      Gerar com IA
                    </button>
                  </div>
                )}

                {currentStepId === "cinema-mensagem" && (
                  <div className="flex flex-col gap-6">
                    {/* Mensagem */}
                    <div className="flex flex-col gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs text-white/60">
                          🎬 Esta frase aparecerá sobre as fotos quando alguém clicar em{" "}
                          <strong className="text-white">Assistir</strong> — como um cartão de
                          abertura do filme.
                        </p>
                      </div>
                      <textarea
                        autoFocus
                        value={data.cinemaMessage}
                        onChange={(e) => update({ cinemaMessage: e.target.value })}
                        placeholder="Cada frame dessa história foi escrito com amor."
                        rows={3}
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand"
                      />
                      <button
                        type="button"
                        onClick={generateCinemaMessage}
                        className="flex w-fit items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-6px_rgba(185,28,28,0.55)] transition-transform hover:-translate-y-0.5"
                      >
                        <Wand2 className="h-4 w-4" />
                        Gerar com IA
                      </button>
                    </div>

                    {/* Fotos do cinema */}
                    <div className="flex flex-col gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-white">📸 Fotos do Cinema</h3>
                        <p className="mt-0.5 text-xs text-white/50">
                          Estas fotos vão aparecer em slideshow quando alguém clicar em Assistir.
                        </p>
                      </div>
                      <PhotoUploader
                        photos={data.cinemaPhotos}
                        onChange={(cinemaPhotos) => update({ cinemaPhotos })}
                      />
                    </div>
                  </div>
                )}

                {currentStepId === "surpresa" && (
                  <div className="flex flex-col gap-5">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs text-white/60">
                        🎁 Antes de abrir o presente, a pessoa verá uma tela especial de surpresa.
                        Personalize para quem é esse presente!
                      </p>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs text-white/50">
                        Para quem é o presente?
                      </label>
                      <input
                        autoFocus
                        value={data.surpresaPara}
                        onChange={(e) => update({ surpresaPara: e.target.value })}
                        placeholder="Ex: Maria, meu amor, você…"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand"
                      />
                      <p className="mt-1.5 text-[11px] text-white/30">
                        💡 Aparecerá como &ldquo;para <em>{data.surpresaPara || "você"}</em>&rdquo; na tela de surpresa
                      </p>
                    </div>
                  </div>
                )}

                {currentStepId === "titulo" && (
                  <input
                    autoFocus
                    value={data.title}
                    onChange={(e) => update({ title: e.target.value })}
                    placeholder="Feliz Aniversário!"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand"
                  />
                )}

                {currentStepId === "para-quem" && (
                  <div className="flex flex-col gap-3">
                    <input
                      autoFocus
                      value={data.recipientName}
                      onChange={(e) => update({ recipientName: e.target.value })}
                      placeholder="Ex: Ana, Pedro, Maria..."
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand"
                    />
                    <p className="text-white/40 text-xs">
                      Este nome aparecerá no cartão que você entregará à pessoa.
                    </p>
                  </div>
                )}

                {currentStepId === "nome" && (
                  <input
                    autoFocus
                    value={data.names}
                    onChange={(e) => update({ names: e.target.value })}
                    placeholder="Nome do casal"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand"
                  />
                )}

                {currentStepId === "mensagem" && (
                  <div className="flex flex-col gap-4">
                    <textarea
                      autoFocus
                      value={data.message}
                      onChange={(e) => update({ message: e.target.value })}
                      placeholder={
                        isAniversario
                          ? "Escreva sua mensagem de aniversário aqui..."
                          : "Digite a mensagem aqui"
                      }
                      rows={6}
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand"
                    />
                    <button
                      type="button"
                      onClick={generateMessage}
                      className="flex w-fit items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-6px_rgba(185,28,28,0.55)] transition-transform hover:-translate-y-0.5"
                    >
                      <Wand2 className="h-4 w-4" />
                      Gerar com IA
                    </button>
                  </div>
                )}

                {currentStepId === "data" && isAniversario && (
                  <div className="flex flex-col gap-4">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs text-white/60">
                        💡 Dica: O presente só poderá ser aberto a partir desta data. Perfeito
                        para criar expectativa!
                      </p>
                    </div>
                    <DateCalendar
                      value={data.openDate}
                      onChange={(date) => update({ openDate: date })}
                      disabled={data.openImmediately}
                    />
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={data.openImmediately}
                        onChange={(e) => update({ openImmediately: e.target.checked })}
                        className="h-4 w-4 shrink-0 accent-brand"
                      />
                      <span className="text-sm text-white/70">
                        Abrir imediatamente (sem data específica)
                      </span>
                    </label>
                  </div>
                )}

                {currentStepId === "data" && !isAniversario && !isPoster && (
                  <input
                    type="date"
                    autoFocus
                    value={data.since}
                    max={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => update({ since: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors [color-scheme:dark] focus:border-brand"
                  />
                )}

                {currentStepId === "data" && isPoster && (
                  <div className="flex flex-col gap-4">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs text-white/60">
                        💡 Esta data aparecerá no filme como &ldquo;Desde [data]&rdquo; — o início
                        da sua história de amor!
                      </p>
                    </div>
                    <DateCalendar
                      value={data.since}
                      onChange={(date) => update({ since: date })}
                      disabled={!data.showDateOnPoster}
                    />
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!data.showDateOnPoster}
                        onChange={(e) => update({ showDateOnPoster: !e.target.checked })}
                        className="h-4 w-4 shrink-0 accent-brand"
                      />
                      <span className="text-sm text-white/70">
                        Não exibir data no filme
                      </span>
                    </label>
                  </div>
                )}

                {currentStepId === "fotos" && (
                  <PhotoUploader photos={data.photos} onChange={(photos) => update({ photos })} />
                )}

                {currentStepId === "cores" && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {themes.map((theme) => {
                      const isSelected = data.themeId === theme.id;
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => update({ themeId: theme.id })}
                          className={cn(
                            "flex flex-col gap-3 rounded-xl border p-4 text-left transition-all duration-300",
                            isSelected
                              ? "border-brand bg-white/10 ring-1 ring-brand"
                              : "border-white/10 bg-white/[0.03] hover:border-white/20"
                          )}
                        >
                          <div className="flex gap-1.5">
                            {theme.swatch.map((color, i) => (
                              <span
                                key={i}
                                className="h-5 w-5 rounded-full ring-1 ring-white/20"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-white">{theme.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentStepId === "efeitos" && (
                  <button
                    type="button"
                    onClick={() => update({ confettiEffect: !data.confettiEffect })}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors",
                      data.confettiEffect
                        ? "border-brand bg-brand-soft/10"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20"
                    )}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-light">
                      <PartyPopper className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-white">Confetti</span>
                      <span className="block text-xs text-white/50">
                        Explosão de confetti ao abrir o presente
                      </span>
                    </span>
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors",
                        data.confettiEffect
                          ? "bg-gradient-brand text-white"
                          : "border border-white/20"
                      )}
                    >
                      {data.confettiEffect && <Check className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                )}

                {currentStepId === "musica" && !isAniversario && !isPoster && !musicIncluded && !data.musicAddOn && (
                  <button
                    type="button"
                    onClick={() => update({ musicAddOn: true })}
                    className="flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-6px_rgba(185,28,28,0.55)] transition-transform hover:-translate-y-0.5"
                  >
                    <Music2 className="h-4 w-4" />
                    Adicionar música
                  </button>
                )}

                {currentStepId === "musica" && isAniversario && (
                  <button
                    type="button"
                    onClick={() => update({ noMusic: !data.noMusic, songTitle: "", songArtist: "", songThumbnail: "", songVideoId: "" })}
                    className="mb-4 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10"
                  >
                    <Music2 className="h-4 w-4" />
                    {data.noMusic ? "Quero adicionar uma música" : "Não quero música"}
                  </button>
                )}

                {currentStepId === "musica" && isAniversario && data.noMusic && (
                  <p className="text-sm text-white/50">
                    Tudo bem! Sua página de aniversário será enviada sem trilha sonora.
                  </p>
                )}

                {currentStepId === "musica" &&
                  (isAniversario || isPoster || musicIncluded || data.musicAddOn) &&
                  !(isAniversario && data.noMusic) && (
                    <div className="flex flex-col gap-4">
                      <SongPicker song={selectedSong} onSelect={selectSong} />

                      {selectedSong && (
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <label className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={data.songStartSeconds > 0}
                              onChange={(e) =>
                                update({ songStartSeconds: e.target.checked ? 30 : 0 })
                              }
                              className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
                            />
                            <span className="text-sm text-white/70">
                              A música não começa do início? Marque esta opção se você quer que
                              o vídeo comece em um momento específico da música (por exemplo,
                              pular a introdução).
                            </span>
                          </label>

                          {data.songStartSeconds > 0 && (
                            <div className="mt-3 pl-7">
                              <label className="mb-1.5 block text-xs text-white/50">
                                Em quantos segundos a música deve começar?
                              </label>
                              <input
                                type="number"
                                min={0}
                                value={data.songStartSeconds}
                                onChange={(e) =>
                                  update({
                                    songStartSeconds: Math.max(0, Number(e.target.value)),
                                  })
                                }
                                placeholder="Ex: 30 (para começar aos 30 segundos)"
                                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                {currentStepId === "revisao" && (
                  <div className="flex flex-col gap-4">
                    {/* Order summary */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/50">Plano selecionado</span>
                        <span className="font-display text-base font-bold text-white">{plan.name}</span>
                      </div>
                      {!musicIncluded && data.musicAddOn && (
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm text-white/50">Música adicional</span>
                          <span className="text-sm font-semibold text-white">+ R$ {formatBRL(MUSIC_ADDON_PRICE)}</span>
                        </div>
                      )}
                      {isAniversario && (
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm text-white/50">Abre em</span>
                          <span className="text-sm font-semibold text-white">
                            {data.openImmediately ? "Imediatamente" : data.openDate
                              ? new Date(`${data.openDate}T00:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
                              : "Não definido"}
                          </span>
                        </div>
                      )}
                      {isAniversario && data.confettiEffect && (
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm text-white/50">Efeitos</span>
                          <span className="text-sm font-semibold text-white">Confetti</span>
                        </div>
                      )}
                      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                        <span className="text-sm text-white/50">Total</span>
                        <span className="font-display text-2xl font-extrabold text-brand-light">R$ {formatBRL(total)}</span>
                      </div>
                    </div>

                    {/* Payment tabs */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04]">
                      {/* Tab pills */}
                      <div className="flex border-b border-white/10">
                        <button
                          type="button"
                          onClick={() => setPaymentTab("pix")}
                          className={cn(
                            "flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors rounded-tl-2xl",
                            paymentTab === "pix" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
                          )}
                        >
                          <QrCode className="h-4 w-4" />
                          Pix
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentTab("card")}
                          className={cn(
                            "flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors rounded-tr-2xl border-l border-white/10",
                            paymentTab === "card" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
                          )}
                        >
                          <CreditCard className="h-4 w-4" />
                          Cartão
                        </button>
                      </div>

                      {/* Pix panel */}
                      {paymentTab === "pix" && (
                        <div className="flex flex-col items-center gap-4 p-5">
                          {!pixData ? (
                            <>
                              <div className="flex h-36 w-36 items-center justify-center rounded-2xl bg-white/5">
                                <QrCode className="h-16 w-16 text-white/20" />
                              </div>
                              <p className="text-center text-sm text-white/50">
                                Clique abaixo para gerar o QR Code Pix
                              </p>
                              <button
                                type="button"
                                onClick={handlePixPay}
                                disabled={submitting}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00B09B] py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-60"
                              >
                                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <QrCode className="h-4 w-4" />}
                                {submitting ? "Gerando…" : "Gerar código Pix"}
                              </button>
                            </>
                          ) : (
                            <>
                              {pixPolling && (
                                <p className="flex items-center gap-1.5 text-xs text-white/40">
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                  Aguardando pagamento…
                                </p>
                              )}
                              {/* QR Code image from MP base64 */}
                              <div className="rounded-2xl bg-white p-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={`data:image/png;base64,${pixData.qr_code_base64}`}
                                  alt="QR Code Pix"
                                  className="h-44 w-44 rounded-lg"
                                />
                              </div>
                              <p className="text-center text-xs text-white/40">
                                Aponte a câmera do seu banco ou copie o código abaixo
                              </p>
                              <div className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
                                <span className="flex-1 truncate font-mono text-[11px] text-white/50">
                                  {pixData.qr_code.slice(0, 40)}…
                                </span>
                                <button
                                  type="button"
                                  onClick={async () => {
                                    await navigator.clipboard.writeText(pixData.qr_code);
                                    setPixCopied(true);
                                    setTimeout(() => setPixCopied(false), 3000);
                                  }}
                                  className="flex shrink-0 items-center gap-1.5 rounded-lg bg-brand/20 px-3 py-1.5 text-xs font-semibold text-brand-light transition-colors hover:bg-brand/30"
                                >
                                  {pixCopied ? <CheckCircle2 className="h-3.5 w-3.5" /> : <ClipboardCopy className="h-3.5 w-3.5" />}
                                  {pixCopied ? "Copiado!" : "Copiar"}
                                </button>
                              </div>
                              <p className="text-center text-[11px] text-white/30">
                                Pagamento único · liberação automática após confirmação
                              </p>
                            </>
                          )}
                        </div>
                      )}

                      {/* Card panel */}
                      {paymentTab === "card" && (
                        <div className="flex flex-col gap-3 p-5">
                          <div>
                            <label className="mb-1 block text-[11px] text-white/40">Número do cartão</label>
                            <input
                              type="text"
                              inputMode="numeric"
                              maxLength={19}
                              placeholder="0000 0000 0000 0000"
                              value={cardNumber}
                              onChange={(e) => {
                                const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                                setCardNumber(v.replace(/(.{4})/g, "$1 ").trim());
                              }}
                              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-brand"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="mb-1 block text-[11px] text-white/40">Validade</label>
                              <input
                                type="text"
                                inputMode="numeric"
                                maxLength={5}
                                placeholder="MM/AA"
                                value={cardExpiry}
                                onChange={(e) => {
                                  let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                                  if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                                  setCardExpiry(v);
                                }}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-brand"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-[11px] text-white/40">CVV</label>
                              <input
                                type="text"
                                inputMode="numeric"
                                maxLength={4}
                                placeholder="•••"
                                value={cardCvc}
                                onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-brand"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="mb-1 block text-[11px] text-white/40">Nome no cartão</label>
                            <input
                              type="text"
                              placeholder="NOME SOBRENOME"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value.toUpperCase())}
                              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-brand"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="mb-1 block text-[11px] text-white/40">CPF do titular</label>
                              <input
                                type="text"
                                inputMode="numeric"
                                maxLength={14}
                                placeholder="000.000.000-00"
                                value={cardCpf}
                                onChange={(e) => {
                                  let v = e.target.value.replace(/\D/g, "").slice(0, 11);
                                  if (v.length > 9) v = `${v.slice(0,3)}.${v.slice(3,6)}.${v.slice(6,9)}-${v.slice(9)}`;
                                  else if (v.length > 6) v = `${v.slice(0,3)}.${v.slice(3,6)}.${v.slice(6)}`;
                                  else if (v.length > 3) v = `${v.slice(0,3)}.${v.slice(3)}`;
                                  setCardCpf(v);
                                }}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-brand"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-[11px] text-white/40">E-mail</label>
                              <input
                                type="email"
                                inputMode="email"
                                placeholder="seu@email.com"
                                value={cardEmail}
                                onChange={(e) => setCardEmail(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-brand"
                              />
                            </div>
                          </div>
                          {cardError && (
                            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-center text-xs font-medium text-red-400">
                              {cardError}
                            </p>
                          )}
                          <button
                            type="button"
                            onClick={handleCardPay}
                            disabled={submitting || !cardNumber || !cardExpiry || !cardCvc || !cardName || !cardCpf || !cardEmail}
                            className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand py-3 text-sm font-bold text-white shadow-[0_8px_30px_-6px_rgba(185,28,28,0.55)] transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
                          >
                            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
                            {submitting ? "Processando…" : `Pagar R$ ${formatBRL(total)}`}
                          </button>
                          <p className="text-center text-[11px] text-white/30">
                            Pagamento seguro via MercadoPago
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between gap-4">
            <Button variant="primary" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            {!isLast && (
              <button
                type="button"
                onClick={goNext}
                disabled={!valid}
                className={cn(
                  "flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-all duration-300",
                  valid
                    ? "bg-gradient-brand text-white shadow-[0_8px_30px_-6px_rgba(185,28,28,0.55)] hover:-translate-y-0.5"
                    : "cursor-not-allowed bg-white/5 text-white/25"
                )}
              >
                {currentStepId === "musica" && !isAniversario && !isPoster && !musicIncluded && !data.musicAddOn ? (
                  <>
                    Não, obrigado
                    <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Próximo
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="mx-auto lg:mx-0">
          {currentStepId === "para-quem" ? (
            <RecipientCardPreview recipientName={data.recipientName} />
          ) : plan.id === "delux" ? (
            <DeluxPreviewPhone
              names={data.names}
              message={data.message}
              since={data.since}
              songTitle={data.songTitle}
              songArtist={data.songArtist}
              songThumbnail={data.songThumbnail}
              songVideoId={data.songVideoId}
              songStartSeconds={data.songStartSeconds}
              photos={data.photos}
              themeId={data.themeId}
            />
          ) : isAniversario && currentStepId === "surpresa" ? (
            <div className="relative w-[280px] shrink-0 rounded-[2.75rem] border-[6px] border-zinc-900 bg-zinc-900 p-2 shadow-2xl sm:w-[320px]">
              <div className="absolute left-1/2 top-2 z-10 h-5 w-28 -translate-x-1/2 rounded-full bg-zinc-900" />
              <div className="relative flex h-[560px] w-full flex-col items-center justify-center overflow-hidden rounded-[2.25rem]"
                style={{ background: "linear-gradient(160deg, #0f0f0f 0%, #1c1008 60%, #0f0a04 100%)" }}
              >
                {/* subtle vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
                {/* top diamond */}
                <div className="relative z-10 flex flex-col items-center gap-4 px-8 text-center">
                  <div className="mb-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: "rgba(212,180,140,0.55)" }}>✦</span>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.32em]" style={{ color: "rgba(212,180,140,0.6)" }}>
                    para {data.surpresaPara || "você"}
                  </p>
                  <div className="mt-1">
                    <p className="text-[22px] font-light leading-snug text-white/90">Uma pequena</p>
                    <p className="text-[28px] italic leading-tight text-white" style={{ fontFamily: "var(--font-script, Georgia, serif)" }}>
                      surpresa
                    </p>
                    <p className="text-[22px] font-light leading-snug text-white/90">te espera</p>
                  </div>
                  <p className="mt-3 text-[10px] tracking-widest" style={{ color: "rgba(212,180,140,0.5)" }}>
                    com amor e carinho
                  </p>
                  <button
                    type="button"
                    className="mt-6 flex items-center gap-2 rounded-full border px-5 py-2.5 text-[11px] font-semibold tracking-wide transition-all"
                    style={{ borderColor: "rgba(212,180,140,0.35)", color: "rgba(212,180,140,0.85)", background: "rgba(212,180,140,0.06)" }}
                  >
                    🎁 ABRIR PRESENTE
                  </button>
                </div>
              </div>
            </div>
          ) : isAniversario ? (
            <AniversarioPreviewPhone
              title={data.title}
              message={data.message}
              photos={data.photos}
              songTitle={data.songTitle}
              songArtist={data.songArtist}
              songThumbnail={data.songThumbnail}
              songVideoId={data.songVideoId}
              songStartSeconds={data.songStartSeconds}
            />
          ) : isPoster ? (
            <PosterPreviewPhone
              movieTitle={data.movieTitle}
              tagline={data.tagline}
              synopsis={data.synopsis}
              since={data.since}
              showDate={data.showDateOnPoster}
              photos={data.photos}
              songTitle={data.songTitle}
              songArtist={data.songArtist}
              songThumbnail={data.songThumbnail}
              songVideoId={data.songVideoId}
              songStartSeconds={data.songStartSeconds}
              onAssistir={data.cinemaPhotos.length > 0 ? () => { setCinemaPrevIdx(0); setCinemaModePreview(true); } : undefined}
            />
          ) : (
            <PreviewPhone
              names={data.names}
              message={data.message}
              since={data.since}
              songTitle={data.songTitle}
              songArtist={data.songArtist}
              songThumbnail={data.songThumbnail}
              songVideoId={data.songVideoId}
              songStartSeconds={data.songStartSeconds}
              photos={data.photos}
              themeId={data.themeId}
            />
          )}
        </div>
      </div>

      <AnimatePresence>
        {showPhotoConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
            onClick={() => setShowPhotoConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-white/10 bg-ink p-6 shadow-2xl"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft/10 text-brand-light">
                  <ImageOff className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Continuar sem fotos?
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    Você não adicionou nenhuma foto ao seu presente. As fotos tornam a
                    experiência muito mais especial! Tem certeza que deseja continuar sem
                    fotos?
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setShowPhotoConfirm(false);
                    setStep((s) => s + 1);
                  }}
                  className="h-11 rounded-full bg-white/10 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                >
                  Continuar sem fotos
                </button>
                <button
                  type="button"
                  onClick={() => setShowPhotoConfirm(false)}
                  className="h-11 rounded-full bg-gradient-brand text-sm font-semibold text-white shadow-[0_8px_30px_-6px_rgba(185,28,28,0.55)] transition-transform hover:-translate-y-0.5"
                >
                  Quero adicionar fotos
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prévia do modo cinema */}
      <AnimatePresence>
        {cinemaModePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-black"
          >
            {/* Slideshow */}
            {data.cinemaPhotos.length > 0 && (
              <div className="absolute inset-0 overflow-hidden">
                {data.cinemaPhotos.map((photo, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={photo.id}
                    src={photo.url}
                    alt=""
                    style={{
                      opacity: i === cinemaPrevIdx ? 1 : 0,
                      transform: i === cinemaPrevIdx ? "scale(1.07)" : "scale(1)",
                      transition: "opacity 1.2s ease, transform 6s ease",
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60" />
              </div>
            )}

            {/* Botão fechar */}
            <button
              onClick={() => setCinemaModePreview(false)}
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-xl text-white/70 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white"
            >
              ✕
            </button>

            {/* Texto cinema */}
            <div className="relative z-10 mt-auto px-8 pb-24">
              <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-white/40">
                Em exibição
              </p>
              <h2 className="font-display text-4xl font-black uppercase leading-tight text-white drop-shadow-2xl sm:text-5xl">
                {data.movieTitle || "Nossa História"}
              </h2>
              {data.cinemaMessage && (
                <p className="mt-4 max-w-sm text-base leading-relaxed text-white/75">
                  {data.cinemaMessage}
                </p>
              )}
            </div>

            {/* Dots de progresso + navegação */}
            {data.cinemaPhotos.length > 1 && (
              <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-2">
                {data.cinemaPhotos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCinemaPrevIdx(i)}
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: i === cinemaPrevIdx ? "28px" : "6px",
                      background: i === cinemaPrevIdx ? "white" : "rgba(255,255,255,0.3)",
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

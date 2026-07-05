"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Music2, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QrArt } from "@/components/ui/qr-art";
import { StepIndicator } from "@/components/criar/step-indicator";
import { PreviewPhone } from "@/components/criar/preview-phone";
import { DeluxPreviewPhone } from "@/components/criar/delux-preview-phone";
import { SongPicker, type YoutubeSong } from "@/components/criar/song-picker";
import { PhotoUploader, type Photo } from "@/components/criar/photo-uploader";
import { getPlan, formatBRL, planHasMusic, MUSIC_ADDON_PRICE } from "@/lib/plans";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

type FormData = {
  names: string;
  message: string;
  since: string;
  songTitle: string;
  songArtist: string;
  songThumbnail: string;
  songVideoId: string;
  songStartSeconds: number;
  photos: Photo[];
  themeId: string;
  musicAddOn: boolean;
};

const steps = [
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

function isStepValid(step: number, data: FormData, musicIncluded: boolean) {
  switch (step) {
    case 0:
      return data.names.trim().length > 0;
    case 1:
      return data.message.trim().length > 0;
    case 2:
      return data.since.trim().length > 0;
    case 5:
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
  const musicIncluded = planHasMusic(plan);

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<FormData>({
    names: "",
    message: "",
    since: "",
    songTitle: "",
    songArtist: "",
    songThumbnail: "",
    songVideoId: "",
    songStartSeconds: 0,
    photos: [],
    themeId: themes[0].id,
    musicAddOn: false,
  });

  const total = plan.price + (!musicIncluded && data.musicAddOn ? MUSIC_ADDON_PRICE : 0);

  const update = (patch: Partial<FormData>) => setData((prev) => ({ ...prev, ...patch }));

  const generateMessage = () => {
    const options = messageIdeas.filter((m) => m !== data.message);
    const pick = options[Math.floor(Math.random() * options.length)];
    update({ message: pick });
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

  const valid = isStepValid(step, data, musicIncluded);
  const isLast = step === steps.length - 1;

  const goNext = () => {
    if (!valid) return;
    if (isLast) {
      setSubmitted(true);
      return;
    }
    setStep((s) => s + 1);
  };

  const goBack = () => {
    if (step === 0) {
      router.push("/#planos");
      return;
    }
    setStep((s) => s - 1);
  };

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand shadow-[0_0_40px_-8px_rgba(185,28,28,0.7)]">
            <Sparkles className="h-7 w-7 text-white" />
          </span>
          <h1 className="mt-8 font-display text-3xl font-extrabold text-white sm:text-4xl">
            Sua página está pronta!
          </h1>
          <p className="mt-3 max-w-md text-white/60">
            Escaneie ou compartilhe o QR Code abaixo para presentear{" "}
            <span className="text-white">{data.names || "quem você ama"}</span>.
          </p>

          <div className="mt-10 rounded-[2rem] bg-white p-7 shadow-2xl">
            <QrArt className="h-48 w-48 sm:h-56 sm:w-56" />
          </div>

          <Button
            size="lg"
            variant="primary"
            className="mt-10"
            onClick={() => router.push("/")}
          >
            Voltar para o início
          </Button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink px-6 py-14 sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-brand/15 blur-[130px]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row lg:items-start lg:justify-between">
        <div className="w-full max-w-xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
            <Sparkles className="h-3 w-3 text-brand-light" />
            {plan.name} · R$ {formatBRL(total)}
          </div>

          <StepIndicator total={steps.length} current={step} />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              {step === 5 && !musicIncluded ? (
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
                  <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {steps[step].title}
                  </h2>
                  <p className="mt-2 text-sm text-white/50">{steps[step].description}</p>
                </>
              )}

              <div className="mt-8">
                {step === 0 && (
                  <input
                    autoFocus
                    value={data.names}
                    onChange={(e) => update({ names: e.target.value })}
                    placeholder="Nome do casal"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand"
                  />
                )}

                {step === 1 && (
                  <div className="flex flex-col gap-4">
                    <textarea
                      autoFocus
                      value={data.message}
                      onChange={(e) => update({ message: e.target.value })}
                      placeholder="Digite a mensagem aqui"
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

                {step === 2 && (
                  <input
                    type="date"
                    autoFocus
                    value={data.since}
                    max={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => update({ since: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors [color-scheme:dark] focus:border-brand"
                  />
                )}

                {step === 3 && (
                  <PhotoUploader photos={data.photos} onChange={(photos) => update({ photos })} />
                )}

                {step === 4 && (
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

                {step === 5 && !musicIncluded && !data.musicAddOn && (
                  <button
                    type="button"
                    onClick={() => update({ musicAddOn: true })}
                    className="flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-6px_rgba(185,28,28,0.55)] transition-transform hover:-translate-y-0.5"
                  >
                    <Music2 className="h-4 w-4" />
                    Adicionar música
                  </button>
                )}

                {step === 5 && (musicIncluded || data.musicAddOn) && (
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
                                update({ songStartSeconds: Math.max(0, Number(e.target.value)) })
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

                {step === 6 && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/50">Plano selecionado</span>
                      <span className="font-display text-lg font-bold text-white">
                        {plan.name}
                      </span>
                    </div>
                    {!musicIncluded && data.musicAddOn && (
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-white/50">Música adicional</span>
                        <span className="text-sm font-semibold text-white">
                          + R$ {formatBRL(MUSIC_ADDON_PRICE)}
                        </span>
                      </div>
                    )}
                    <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                      <span className="text-sm text-white/50">Total</span>
                      <span className="font-display text-2xl font-extrabold text-brand-light">
                        R$ {formatBRL(total)}
                      </span>
                    </div>
                    <p className="mt-4 text-xs text-white/40">
                      Pagamento único · liberação imediata · reembolso em até 7 dias
                    </p>
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
              {isLast
                ? "Finalizar e pagar"
                : step === 5 && !musicIncluded && !data.musicAddOn
                ? "Não, obrigado"
                : "Próximo"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mx-auto lg:mx-0">
          {plan.id === "delux" ? (
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
    </main>
  );
}

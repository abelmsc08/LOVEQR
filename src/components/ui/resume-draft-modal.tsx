"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Draft {
  planId: string;
  step: number;
  savedAt: number;
}

export function ResumeDraftModal() {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("qrlove_draft");
      if (!raw) return;
      const parsed: Draft = JSON.parse(raw);
      if (parsed.planId && parsed.savedAt) setDraft(parsed);
    } catch {
      /* ignore */
    }
  }, []);

  if (!draft) return null;

  function handleContinue() {
    router.push(`/criar?plano=${draft!.planId}`);
  }

  function handleDiscard() {
    try {
      localStorage.removeItem("qrlove_draft");
    } catch {
      /* ignore */
    }
    setDraft(null);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleDiscard}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm rounded-2xl bg-[#1a1a2e] p-6 text-white shadow-2xl">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <span className="text-4xl">💝</span>
        </div>

        <h2 className="mb-2 text-center text-lg font-bold">
          Página em andamento encontrada!
        </h2>
        <p className="mb-6 text-center text-sm text-white/60">
          Você começou a criar uma página e ainda não finalizou. Deseja continuar
          de onde parou?
        </p>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full rounded-xl bg-red-500 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Continuar edição
          </button>
          <button
            type="button"
            onClick={handleDiscard}
            className="w-full rounded-xl bg-white/10 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80"
          >
            + Criar nova página
          </button>
        </div>
      </div>
    </div>
  );
}

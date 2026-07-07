"use client";

import { Heart, QrCode } from "lucide-react";

export function RecipientCardPreview({ recipientName }: { recipientName: string }) {
  const name = recipientName.trim() || "Nome dela/dele";

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Card */}
      <div
        className="relative w-[280px] rounded-3xl bg-white shadow-2xl overflow-hidden"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)" }}
      >
        {/* Top accent bar */}
        <div className="h-2 w-full bg-gradient-to-r from-red-600 to-red-400" />

        <div className="flex flex-col items-center px-8 py-8 gap-5">
          {/* Heart */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <Heart className="h-6 w-6 fill-red-500 text-red-500" />
          </div>

          {/* Para */}
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-1">Para</p>
            <p
              className="text-2xl font-bold text-gray-900 leading-tight transition-all duration-300"
              style={{ fontFamily: "var(--font-dancing, cursive)" }}
            >
              {name}
            </p>
          </div>

          {/* Message */}
          <p className="text-center text-sm text-gray-500 leading-relaxed">
            Uma surpresa especial<br />espera por você.
          </p>

          {/* QR Code placeholder */}
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex h-[120px] w-[120px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
              <QrCode className="h-12 w-12 text-gray-300" />
            </div>
            <p className="text-[11px] text-gray-400 tracking-wide">
              Escaneie com a câmera do celular
            </p>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-red-400 to-red-600" />
      </div>

      <p className="text-white/40 text-xs text-center">
        O QR Code real aparece após o pagamento
      </p>
    </div>
  );
}

import { Heart, Music2, MapPin, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

export function PhoneMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-[280px] sm:w-[320px] rounded-[2.75rem] border-[6px] border-ink bg-ink p-2 shadow-2xl",
        className
      )}
    >
      <div className="absolute left-1/2 top-2 z-10 h-5 w-28 -translate-x-1/2 rounded-full bg-ink" />
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[2.25rem] bg-gradient-brand">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]" />

        <div className="relative z-[1] flex h-full flex-col items-center px-5 pt-12 pb-6 text-center text-white">
          <span className="text-[11px] uppercase tracking-[0.3em] text-white/70">
            uma história de amor
          </span>

          <div className="mt-5 flex h-24 w-24 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/30">
            <Heart className="h-10 w-10 fill-white text-white" />
          </div>

          <h3 className="mt-5 font-display text-2xl">Ana &amp; Pedro</h3>
          <p className="mt-1 text-[11px] text-white/70">
            juntos desde 12 de março de 2022
          </p>

          <div className="mt-4 flex gap-2 text-[11px] font-semibold">
            <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-md">
              1096 dias
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-md">
              juntos
            </span>
          </div>

          <div className="mt-5 w-full rounded-2xl bg-white/10 p-3 text-left backdrop-blur-md ring-1 ring-white/20">
            <div className="flex items-center gap-2">
              <Music2 className="h-4 w-4 shrink-0" />
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium">Perfect</p>
                <p className="truncate text-[10px] text-white/60">Ed Sheeran</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[3, 6, 4, 8, 5].map((h, i) => (
                  <span
                    key={i}
                    className="w-0.5 rounded-full bg-white/70"
                    style={{ height: h }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 grid w-full grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/20"
              >
                <Camera className="h-4 w-4 text-white/60" />
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-[10px] text-white/60">
            <MapPin className="h-3 w-3" />
            Rio de Janeiro, Brasil
          </div>
        </div>
      </div>
    </div>
  );
}

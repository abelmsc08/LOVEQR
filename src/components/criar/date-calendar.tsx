"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["dom", "seg", "ter", "qua", "qui", "sex", "sab"];
const MONTHS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

function toISODate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

export function DateCalendar({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (date: string) => void;
  disabled?: boolean;
}) {
  const selected = value ? new Date(`${value}T00:00:00`) : null;
  const [cursor, setCursor] = useState(() => selected ?? new Date());

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const selectedLabel = selected
    ? selected.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })
    : "Nenhuma data selecionada";

  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/5 p-4 transition-opacity",
        disabled && "pointer-events-none opacity-40"
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium capitalize text-white">
          {MONTHS[month]} <span className="text-white/50">{year}</span>
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] uppercase text-white/40">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <span key={i} />;
          const date = new Date(year, month, day);
          const iso = toISODate(date);
          const isSelected = value === iso;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(iso)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors",
                isSelected
                  ? "bg-gradient-brand font-semibold text-white"
                  : "text-white/70 hover:bg-white/10"
              )}
            >
              {day}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-white/50">
        Data selecionada: <span className="text-white">{selectedLabel}</span>
      </p>
    </div>
  );
}

"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function StepIndicator({
  total,
  current,
  showNumbers = true,
}: {
  total: number;
  current: number;
  showNumbers?: boolean;
}) {
  return (
    <div className="flex items-center">
      {Array.from({ length: total }, (_, i) => {
        const isDone = i < current;
        const isCurrent = i === current;
        const isLast = i === total - 1;

        return (
          <div key={i} className="flex items-center">
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300",
                isDone && "bg-gradient-brand text-white",
                isCurrent && "border-2 border-brand text-brand",
                !isDone && !isCurrent && "border-2 border-dashed border-white/20 text-white/30"
              )}
            >
              {isDone ? <Check className="h-4 w-4" /> : showNumbers ? i + 1 : null}
            </span>
            {!isLast &&
              (isDone ? (
                <span className="mx-1.5 h-[2px] w-8 bg-gradient-brand sm:w-12" />
              ) : (
                <span className="mx-1.5 h-0 w-8 border-t-2 border-dashed border-white/15 sm:w-12" />
              ))}
          </div>
        );
      })}
    </div>
  );
}

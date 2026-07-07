"use client";

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <span
      className="inline-block shrink-0 select-none [-webkit-touch-callout:none]"
      style={{ width: size, height: size }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Meu QR Love"
        width={size}
        height={size}
        draggable={false}
        className="h-full w-full select-none rounded-lg object-cover pointer-events-none"
      />
    </span>
  );
}

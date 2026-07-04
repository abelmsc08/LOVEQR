"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-brand text-white shadow-[0_8px_30px_-6px_rgba(214,40,90,0.55)] hover:shadow-[0_12px_40px_-6px_rgba(214,40,90,0.7)] hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-white text-ink border border-black/10 hover:border-black/20 hover:-translate-y-0.5 shadow-sm",
        ghost: "bg-transparent text-ink hover:bg-black/5",
        outlineLight:
          "bg-white/10 text-white border border-white/30 backdrop-blur-md hover:bg-white/20 hover:-translate-y-0.5",
      },
      size: {
        default: "h-12 px-6 text-[15px]",
        lg: "h-14 px-8 text-base",
        sm: "h-10 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-[background-color,color,border-color,box-shadow,transform] duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-darkred/20 focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand-darkred text-white hover:bg-brand-darkred-dark",
        secondary: "bg-surface text-slate-700 hover:bg-surface-hover",
        outline:
          "border border-border bg-white text-slate-700 hover:border-brand-blue/30 hover:bg-surface",
        ghost: "text-slate-700 hover:bg-surface-hover",
        danger: "bg-red-700 text-white hover:bg-red-800",
        "brand-secondary": "bg-brand-blue text-white hover:bg-[#123c55]",
      },
      size: {
        sm: "h-11 px-3.5 text-sm",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };

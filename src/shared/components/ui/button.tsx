import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-darkred/30 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand-darkred text-white hover:bg-brand-darkred-dark shadow-sm hover:shadow-md",
        secondary: "bg-slate-100 text-slate-700 hover:bg-slate-200",
        outline: "border border-border bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-800",
        ghost: "hover:bg-slate-100 text-slate-600",
        danger: "bg-red-600 text-white hover:bg-red-500 shadow-sm",
        "brand-secondary": "bg-brand-blue text-white hover:bg-brand-blue/90 shadow-sm",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-5 py-2",
        lg: "h-11 px-6 py-2.5 text-[15px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

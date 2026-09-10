import * as React from "react";
import { cn } from "../lib/utils";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "destructive";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-slate-950 text-white hover:bg-slate-800",
  secondary: "bg-slate-100 text-slate-950 hover:bg-slate-200",
  outline: "border border-slate-300 bg-white text-slate-950 hover:bg-slate-50",
  ghost: "bg-transparent text-slate-950 hover:bg-slate-100",
  destructive: "bg-red-600 text-white hover:bg-red-700",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-12 px-5",
  icon: "h-10 w-10",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size = "default", type = "button", variant = "default", ...props }, ref) => (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    />
  ),
);

Button.displayName = "Button";

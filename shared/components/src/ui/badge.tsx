import * as React from "react";
import { cn } from "../lib/utils";

type BadgeVariant = "default" | "secondary" | "outline" | "success" | "warning" | "destructive";

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-slate-950 text-white",
  secondary: "bg-slate-100 text-slate-700",
  outline: "border border-slate-300 bg-white text-slate-700",
  success: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  destructive: "bg-red-100 text-red-800",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

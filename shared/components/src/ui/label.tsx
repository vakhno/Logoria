import * as React from "react";
import { cn } from "../lib/utils";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label className={cn("grid gap-1 text-sm", className)} ref={ref} {...props} />
  ),
);

Label.displayName = "Label";

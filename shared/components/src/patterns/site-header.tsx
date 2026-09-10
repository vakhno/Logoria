import * as React from "react";
import { cn } from "../lib/utils";

export type SiteHeaderProps = React.HTMLAttributes<HTMLElement>;

export type SiteHeaderSectionProps = React.HTMLAttributes<HTMLDivElement>;
export type SiteHeaderNavProps = React.HTMLAttributes<HTMLElement>;

function SiteHeaderRoot({ className, ...props }: SiteHeaderProps) {
  return (
    <header
      className={cn("flex flex-wrap items-center justify-between gap-4", className)}
      {...props}
    />
  );
}

function SiteHeaderBrand({ className, ...props }: SiteHeaderSectionProps) {
  return <div className={cn("flex items-center gap-6", className)} {...props} />;
}

function SiteHeaderNav({ className, ...props }: SiteHeaderNavProps) {
  return <nav className={cn("flex items-center gap-4", className)} {...props} />;
}

function SiteHeaderActions({ className, ...props }: SiteHeaderSectionProps) {
  return <div className={cn("flex items-center gap-3", className)} {...props} />;
}

export const SiteHeader = Object.assign(SiteHeaderRoot, {
  Actions: SiteHeaderActions,
  Brand: SiteHeaderBrand,
  Nav: SiteHeaderNav,
});

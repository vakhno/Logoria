import * as React from "react";
import { cn } from "../lib/utils";

export type HeaderProps = React.HTMLAttributes<HTMLElement>;

export type HeaderSectionProps = React.HTMLAttributes<HTMLDivElement>;
export type HeaderNavProps = React.HTMLAttributes<HTMLElement>;

function HeaderRoot({ className, ...props }: HeaderProps) {
  return (
    <header
      className={cn("flex flex-wrap items-center justify-between gap-4", className)}
      {...props}
    />
  );
}

function HeaderBrand({ className, ...props }: HeaderSectionProps) {
  return <div className={cn("flex items-center gap-6", className)} {...props} />;
}

function HeaderNav({ className, ...props }: HeaderNavProps) {
  return <nav className={cn("flex items-center gap-4", className)} {...props} />;
}

function HeaderActions({ className, ...props }: HeaderSectionProps) {
  return <div className={cn("flex items-center gap-3", className)} {...props} />;
}

export const Header = Object.assign(HeaderRoot, {
  Actions: HeaderActions,
  Brand: HeaderBrand,
  Nav: HeaderNav,
});

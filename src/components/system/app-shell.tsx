"use client";

import { LenisProvider } from "@/contexts/lenis-context";

type AppShellProps = {
  children: React.ReactNode;
};

/** Lenis only — editorial experience uses native scroll feel without cursor chrome. */
export function AppShell({ children }: AppShellProps) {
  return <LenisProvider>{children}</LenisProvider>;
}

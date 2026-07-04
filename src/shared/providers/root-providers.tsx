"use client";

import { ReactNode } from "react";
import { QueryProvider } from "./query-provider";

export function RootProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}

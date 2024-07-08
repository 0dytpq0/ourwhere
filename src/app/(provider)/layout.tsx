"use client";

import QueryProvider from "@/providers/query.provider";
import { ScheduleStoreProvider } from "@/providers/schedule.store.provider";
import { PropsWithChildren } from "react";

function ProviderLayout({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <ScheduleStoreProvider>{children}</ScheduleStoreProvider>;
    </QueryProvider>
  );
}

export default ProviderLayout;

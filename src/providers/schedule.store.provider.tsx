"use client";

import {
  ScheduleStore,
  createScheduleStore,
  initScheduleStore,
} from "@/stores/shcedule.store";
import { ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type ScheduleStoreApi = ReturnType<typeof createScheduleStore>;

export const ScheduleStoreContext = createContext<ScheduleStoreApi | undefined>(
  undefined
);

export interface ScheduleStoreProviderProps {
  children: ReactNode;
}

export const ScheduleStoreProvider = ({
  children,
}: ScheduleStoreProviderProps) => {
  const storeRef = useRef<ScheduleStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createScheduleStore(initScheduleStore());
  }

  return (
    <ScheduleStoreContext.Provider value={storeRef.current}>
      {children}
    </ScheduleStoreContext.Provider>
  );
};

export const useScheduleStore = <T,>(
  selector: (store: ScheduleStore) => T
): T => {
  const scheduleStoreContext = useContext(ScheduleStoreContext);

  if (!scheduleStoreContext) {
    throw new Error(
      `useScheduleStore must be used within ScheduleStoreProvider`
    );
  }

  return useStore(scheduleStoreContext, selector);
};

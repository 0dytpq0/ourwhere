import { createStore } from "zustand";

export type ScheduleState = {
  schedule: string;
};

export type ScheduleActions = {
  addSchedule: (newSchedule: string) => void;
  deleteSchedule: (id: number) => void;
};

export type ScheduleStore = ScheduleState & ScheduleActions;

export const initScheduleStore = (): ScheduleStore => {
  return {
    schedule: "기본값 입니다.",
    addSchedule: (newSchedule: string) => {
      console.log(newSchedule + "추가");
    },
    deleteSchedule: (id: number) => {
      console.log(id + "삭제");
    },
  };
};

export const defaultInitState: ScheduleState = {
  schedule: "아몰라 그냥 놀자",
};

// state는 initState에서 추가, action은 initScheduleStore 밑 아래에 같이 추가해야될듯?
// next.js 문서 따라 쳤는데 흠... 한번 하면서 알아봐야할듯함.
export const createScheduleStore = (
  initState: ScheduleState = defaultInitState
) => {
  return createStore<ScheduleStore>()((set) => ({
    ...initState,
    addSchedule: () => set((state) => ({})),
    deleteSchedule: () => set((state) => ({})),
  }));
};

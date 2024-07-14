import create from 'zustand';
import { Tables } from '@/types/supabase';

type ScheduleType = Tables<'schedule'>;

interface ScheduleStore {
  scheduleData: ScheduleType[];
  clickScheduleId: number;
  setScheduleData: (data: ScheduleType[]) => void;
  setClickScheduleId: (id: number) => void;
}

const useScheduleStore = create<ScheduleStore>((set) => ({
  scheduleData: [],
  clickScheduleId: 0,
  setScheduleData: (data: ScheduleType[]) => set({ scheduleData: data }),
  setClickScheduleId: (id) => set({ clickScheduleId: id })
}));

export default useScheduleStore;

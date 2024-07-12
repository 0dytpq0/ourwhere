import create from 'zustand';
import { Tables } from '@/types/supabase';

type ScheduleType = Tables<'schedule'>;

interface ScheduleStore {
  scheduleData: ScheduleType[];
  setScheduleData: (data: ScheduleType[]) => void;
}

const useScheduleStore = create<ScheduleStore>((set) => ({
  scheduleData: [],
  setScheduleData: (data: ScheduleType[]) => set({ scheduleData: data }),
}));

export default useScheduleStore;

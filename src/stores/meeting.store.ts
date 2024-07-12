import create from 'zustand';

interface MeetingStore {
  meetingId: number;
  setMeetingId: (meetingId: number) => void;
}

const useMeetingStore = create<MeetingStore>((set) => ({
  meetingId: 0,
  setMeetingId: (meetingId: number) => set((state) => ({ meetingId: meetingId }))
}));

export default useMeetingStore;

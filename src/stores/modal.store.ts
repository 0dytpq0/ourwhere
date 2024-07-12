import create from 'zustand';

interface ModalStore {
  isScheduleModalOpen: boolean;
  isMeetingModalOpen: boolean;
  toggleScheduleModal: () => void;
  toggleMeetingModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isScheduleModalOpen: false,
  isMeetingModalOpen: false,
  toggleScheduleModal: () => set((state) => ({ isScheduleModalOpen: !state.isScheduleModalOpen })),
  toggleMeetingModal: () => set((state) => ({ isMeetingModalOpen: !state.isMeetingModalOpen }))
}));

export default useModalStore;

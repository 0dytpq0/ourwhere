import create from 'zustand';

interface ModalStore {
  isScheduleModalOpen: boolean;
  isMeetingModalOpen: boolean;
  isCheckPasswordModalOpen: boolean;
  toggleScheduleModal: () => void;
  toggleMeetingModal: () => void;
  toggleCheckPasswordModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isScheduleModalOpen: false,
  isMeetingModalOpen: false,
  isCheckPasswordModalOpen: false,
  toggleScheduleModal: () => set((state) => ({ isScheduleModalOpen: !state.isScheduleModalOpen })),
  toggleMeetingModal: () => set((state) => ({ isMeetingModalOpen: !state.isMeetingModalOpen })),
  toggleCheckPasswordModal: () => set((state) => ({ isCheckPasswordModalOpen: !state.isCheckPasswordModalOpen }))
}));

export default useModalStore;

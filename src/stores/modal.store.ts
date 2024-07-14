import create from 'zustand';

interface ModalStore {
  isCreateScheduleModalOpen: boolean;
  isEditScheduleModalOpen: boolean;
  isMeetingModalOpen: boolean;
  toggleCreateScheduleModal: () => void;
  toggleEditScheduleModal: () => void;
  toggleMeetingModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isCreateScheduleModalOpen: false,
  isEditScheduleModalOpen: false,
  isMeetingModalOpen: false,
  toggleCreateScheduleModal: () => set((state) => ({ isCreateScheduleModalOpen: !state.isCreateScheduleModalOpen })),
  toggleEditScheduleModal: () => set((state) => ({ isEditScheduleModalOpen: !state.isEditScheduleModalOpen })),
  toggleMeetingModal: () => set((state) => ({ isMeetingModalOpen: !state.isMeetingModalOpen }))
}));

export default useModalStore;

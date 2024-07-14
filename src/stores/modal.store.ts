import create from 'zustand';

interface ModalStore {
  isCreateScheduleModalOpen: boolean;
  isEditScheduleModalOpen: boolean;
  isMeetingModalOpen: boolean;
  isCheckPasswordModalOpen: boolean;
  toggleCreateScheduleModal: () => void;
  toggleEditScheduleModal: () => void;
  toggleMeetingModal: () => void;
  toggleCheckPasswordModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isCreateScheduleModalOpen: false,
  isEditScheduleModalOpen: false,
  isMeetingModalOpen: false,

  isCheckPasswordModalOpen: true,
  toggleMeetingModal: () => set((state) => ({ isMeetingModalOpen: !state.isMeetingModalOpen })),
  toggleCheckPasswordModal: () => set((state) => ({ isCheckPasswordModalOpen: !state.isCheckPasswordModalOpen })),
  toggleCreateScheduleModal: () => set((state) => ({ isCreateScheduleModalOpen: !state.isCreateScheduleModalOpen })),
  toggleEditScheduleModal: () => set((state) => ({ isEditScheduleModalOpen: !state.isEditScheduleModalOpen }))
}));

export default useModalStore;

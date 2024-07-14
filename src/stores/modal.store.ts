import create from 'zustand';
interface ModalStore {
  isCreateScheduleModalOpen: boolean;
  isEditScheduleModalOpen: boolean;
  isMeetingModalOpen: boolean;
  isCheckPasswordModalOpen: boolean;
  toggleCreateScheduleModal: () => void;
  toggleEditScheduleModal: () => void;
  toggleMeetingModal: () => void;
  closeCheckPasswordModal: () => void;
  openCheckPasswordModal: () => void;
}
const useModalStore = create<ModalStore>((set) => ({
  isCreateScheduleModalOpen: false,
  isEditScheduleModalOpen: false,
  isMeetingModalOpen: false,
  isCheckPasswordModalOpen: true,
  toggleMeetingModal: () => set((state) => ({ isMeetingModalOpen: !state.isMeetingModalOpen })),
  toggleCreateScheduleModal: () => set((state) => ({ isCreateScheduleModalOpen: !state.isCreateScheduleModalOpen })),
  toggleEditScheduleModal: () => set((state) => ({ isEditScheduleModalOpen: !state.isEditScheduleModalOpen })),
  openCheckPasswordModal: () => set((state) => ({ isCheckPasswordModalOpen: true })),
  closeCheckPasswordModal: () => set((state) => ({ isCheckPasswordModalOpen: false }))
}));
export default useModalStore;

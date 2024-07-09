import create from 'zustand';

interface ModalStore {
  modal: boolean;
  toggleModal: (state: boolean) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modal: false,
  toggleModal: () => set((state) => ({ modal: !state.modal }))
}));

export default useModalStore;

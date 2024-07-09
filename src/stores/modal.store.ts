import create from 'zustand';

const useModalStore = create((set) => {
  return {
    modal: false,
    changeModal: () => {
      set((state:) => ({ modal: !state.modal }));
    }
  };
});

export default useModalStore;

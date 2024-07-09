'use client';
import Modal from '@/components/templates/Modal';
import useModalStore from '@/stores/modal.store';

export default function Home() {
  const toggleModal = useModalStore((state) => {
    return state.change;
  });

  return (
    <main>
      <button className="bg-slate-400" onClick={toggleModal}>
        새 모입 생성하기!
      </button>
      <Modal />
    </main>
  );
}

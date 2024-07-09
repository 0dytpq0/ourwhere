'use client';

import useModalStore from '@/stores/modal.store';

export default function Meeting() {
  const modal = useModalStore((state) => state.modal);
  const toggleModal = useModalStore((state) => state.toggleModal);

  return (
    <>
      <section className="bg-loginpage-color h-lvh">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl mb-3 text-font-color">예은이 생파 홍대</h1>
          <input type="date" placeholder="날짜" className="p-1 w-64 rounded-xl" />
          <button
            onClick={toggleModal}
            className="w-16 h-16 rounded-full bg-header-color text-loginpage-color text-4xl mt-5 "
          >
            +
          </button>
        </div>
      </section>

      {modal && <scheduleModal handleClose={toggleModal} />}
    </>
  );
}

'use client';
import { useState } from 'react';
import Modal from '../molecules/Modal';
import Schedule from '../molecules/schedule';

export default function Meeting() {
  const [modal, setModal] = useState(false);
  const handleModal = () => setModal(!modal);
  console.log(modal);
  return (
    <>
      <section className="bg-loginpage-color pt-16 h-dvh">
        <div className="flex flex-col items-center pt-10">
          <h1 className="text-4xl mb-3 text-font-color">예은이 생파 홍대</h1>
          <input type="date" placeholder="날짜" className="p-1 w-64 rounded-xl" />
          <Schedule />
          <button
            onClick={handleModal}
            className="w-16 h-16 rounded-full bg-header-color text-loginpage-color text-4xl mt-5 "
          >
            +
          </button>
        </div>
      </section>

      {modal && <Modal handleClose={handleModal} />}
    </>
  );
}

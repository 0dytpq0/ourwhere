import React from 'react';

interface ModalProps {
  clickModal: () => void;
}

const Modal: React.FC<ModalProps> = () => {
  return (
    <div>
      <button onClick={() => {}}>돌아가기</button>
      <button>생성하기</button>
      <p>ddd</p>
    </div>
  );
};

export default Modal;

import React from 'react';

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

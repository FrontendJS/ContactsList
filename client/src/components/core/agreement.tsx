import React from 'react';

type AgreementProps = {
  title: string;
  description: string;
  agree: () => void;
  cancel: () => void;
};

const Agreement: React.FC<AgreementProps> = ({ title, description, agree, cancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{description}</p>
        <button
          onClick={agree}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          agree
        </button>
        <button
          onClick={cancel}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          cancel
        </button>
      </div>
    </div>
  );
};

export default Agreement;

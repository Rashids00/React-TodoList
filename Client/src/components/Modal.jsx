import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm, message, showButtons }) => {
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <p className="mb-4 mt-4">{message}</p>
        {showButtons && (
          <div className="flex justify-end">
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Yes
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

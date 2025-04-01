import React from "react";

function ConfirmRejectModal({ isOpen, onCancel, onConfirm, comment, setComment }) {
  if (!isOpen) return null;

  return (
    <div
      id="popup-modal"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full bg-black bg-opacity-50"
    >
      <div className="relative p-1 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mt-4 mb-4 text-gray-800 w-12 h-12"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p className="mb-1 text-lg font-bold text-gray-800">ไม่ผ่านการตรวจสอบ</p>
            <p className="text-sm font-normal text-gray-800">โปรดกรอกหมายเหตุ</p>
          </div>

          <div className="px-5 pb-5">
            <label className="block mb-2 text-sm font-medium text-black">
              หมายเหตุ:
            </label>
            <textarea
              rows="4"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
              placeholder="กรอกหมายเหตุ"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="relative flex justify-center items-center">
            <button
              type="button"
              onClick={onConfirm}
              disabled={comment.trim() === ""}
              className={`text-white rounded-lg px-5 py-2.5 text-sm mb-5 ${
                comment.trim() === ""
                  ? "disabled:bg-gray-400 disabled:cursor-not-allowed"
                  : "bg-lime-800 hover:bg-lime-700"
              }`}
            >
              เสร็จสิ้น
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmRejectModal;
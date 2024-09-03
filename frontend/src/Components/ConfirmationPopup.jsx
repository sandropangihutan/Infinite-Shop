import React from "react";

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center justify-center z-40">
        <div className="py-2.5 pl-16 bg-white rounded-3xl max-w-[551px] max-md:pl-5">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch my-auto text-base text-center text-red-500 max-md:mt-10">
                <div className="self-center text-2xl font-bold">UH-OH !!!</div>
                <div className="mt-2 text-sm text-slate-500">{message}</div>
                <div
                  className="justify-center px-10 py-1 mt-10 mr-3.5 ml-3 text-white whitespace-nowrap bg-red-500 rounded-[100px] max-md:px-5 max-md:mx-2.5 cursor-pointer"
                  onClick={onConfirm}
                >
                  Yay
                </div>
                <div
                  className="justify-center px-10 py-1 mt-5 mr-3.5 ml-3 whitespace-nowrap border border-red-500 border-solid rounded-[100px] max-md:px-5 max-md:mx-2.5 cursor-pointer"
                  onClick={onCancel}
                >
                  Nay
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                src="https://i.postimg.cc/fyNGt84r/LOH.png" 
                alt="Confirmation Illustration"
                className="w-full aspect-square max-md:mt-2.5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;

import React, { useState, useEffect } from "react";
import chat from "../assets/chat.png";
import chat2 from "../assets/chat1.png";
import logo from "../assets/infinite.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

function Chat() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <button
        className="btn w-[94px] h-[91.09px] py-[21px] bg-violet-600 rounded-[60px] shadow-lg flex justify-center items-center"
        style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" }}
        onClick={toggleModal}
      >
        <img src={chat} alt="Chat Icon" className="w-[50px] h-[50px]" />
      </button>
      {isModalOpen && (
        <dialog id="my_modal_2" className="modal" open>
          <div className="bg-white rounded-lg border border-violet-600 flex flex-col justify-start items-center p-5 gap-4 w-11/12 max-w-md mx-auto">
            <div className="w-full flex justify-between items-center border-b border-neutral-300">
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full" src={logo} alt="Logo" />
                <div className="flex flex-col">
                  <div className="text-gray-800 text-base font-bold font-['Poppins']">
                    Infinite Learning
                  </div>
                  <div className="text-gray-500 text-[10px] font-normal font-['Poppins']">
                    Last seen 1 hour ago
                  </div>
                </div>
              </div>
              <button onClick={toggleModal}>Close</button>
            </div>
            <div className="flex flex-col items-center gap-4 p-5">
              <div className="text-violet-600 text-lg font-semibold font-['Poppins']">
                Welcome to IL Shop
              </div>
              <img
                src={chat2}
                alt="Chat Image"
                className="w-[276px] h-[271px]"
              />
            </div>
            <div className="w-full p-5 flex items-center gap-3 border-t border-neutral-300">
              <button>
                <ion-icon
                  name="happy-outline"
                  style={{ color: "#8A3DFF" }}
                ></ion-icon>
              </button>
              <input
                type="text"
                placeholder="Please via WhatsApp"
                className="flex-grow p-2 rounded-[10px] bg-[#F3ECFF]"
              />
              <button>
                <ion-icon
                  name="paper-plane"
                  style={{ color: "#8A3DFF" }}
                ></ion-icon>
              </button>
            </div>
            <div className="w-full flex items-center justify-center pt-3">
              <a
                href="https://wa.me/6282387597266"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-violet-600 text-white rounded-lg text-center font-['Poppins'] font-semibold shadow-lg transition hover:bg-violet-500"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default Chat;

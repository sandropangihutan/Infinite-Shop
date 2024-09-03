import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
import { Link } from "react-router-dom";
import Copy from "../../assets/copy.svg";

function Payment() {
  // State untuk waktu tersisa
  const [timeLeft, setTimeLeft] = useState(new Date(0, 0, 0, 23, 59, 60));
  // State untuk deadline pembayaran
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const newTime = new Date(prevTime);
        newTime.setSeconds(newTime.getSeconds() - 1);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const formattedDeadline = now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    setDeadline(formattedDeadline);
  }, []);

  const formatTime = time => {
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <Navbar />
      <div className="text-center text-gray-800 text-2xl mt-12 font-semibold font-['Poppins']">
        Complete payment in
        <div className="text-red-500 font-bold mt-2">{formatTime(timeLeft)}</div>
      </div>
      <div className="text-center text-slate-500 text-lg font-medium font-['Poppins'] mt-4">
        Final Payment Deadline
        <div className="text-gray-800 text-xl font-semibold">
          {deadline}
        </div>
      </div>
      <div className="flex justify-center items-center mt-10">
        <div className="w-[45rem] h-64 py-5 rounded-lg border border-violet-600 flex flex-col justify-start items-center gap-5">
          <div className="w-full flex pl-10">
            <div className="text-gray-800 text-lg font-semibold font-['Poppins']">
              Virtual Account Billing
            </div>
          </div>
          <div className="w-full h-px border border-violet-600"></div>
          <div className="w-full flex flex-col justify-between items-start px-10 gap-7">
            <div className="w-full flex flex-col justify-start items-start">
              <div className="text-slate-500 text-sm font-medium font-['Poppins']">
                Account Number
              </div>
              <div className="flex justify-between w-full">
                <div className="text-gray-800 text-lg font-semibold font-['Poppins']">
                  1234567891234
                </div>
                <div className="flex items-center space-x-2 text-violet-600 text-base font-semibold font-['Poppins']">
                  <span>Copy</span>
                  <img src={Copy} alt="Copy Account Number" />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col justify-start items-start">
              <div className="text-slate-500 text-sm font-medium font-['Poppins']">
                Total Payment
              </div>
              <div className="flex justify-between w-full">
                <div className="text-gray-800 text-lg font-semibold font-['Poppins']">
                  Rp 135.000
                </div>
                <div className="flex items-center space-x-2 text-violet-600 text-base font-semibold font-['Poppins']">
                  <span>Copy</span>
                  <img src={Copy} alt="Copy Total Payment" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10 mb-20">
        <div className="w-[45rem] h-10 flex justify-between items-center gap-5 mb-10">
          <div className="w-1/2 h-10 rounded-md border border-amber-400 flex justify-center items-center">
            <button className="w-full text-center text-violet-900 text-sm font-semibold font-['Poppins']">
              Check Order Status
            </button>
          </div>
          <div className="w-1/2 h-10 flex justify-center items-center">
            <Link to="/HomePage" className="w-full h-full">
              <button type="submit" className="w-full h-full swipe1 up">
                <span className="text">Back Shopping</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Payment;

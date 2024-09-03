import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTimes, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/settings.css";

function BannerPopup({ onClose }) {
  const handleCancel = () => {
    onClose();
  };

  const handleSave = () => {
    // Logika untuk menyimpan data atau melakukan tindakan yang sesuai dengan kebutuhan aplikasi
  };

  return (
    <div className="popup-container-banner">
      <button className="close-btn" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className="w-[max] h-[max] px-[27px] py-[29px] bg-white rounded-tr-[15px] rounded-bl-[15px] rounded-br-[15px] justify-end items-start gap-[15px] inline-flex">
        <div className="flex flex-col justify-start items-start inline-flex">
          <div className="text-indigo-950 text-base font-semibold font-['Poppins']">Slide 1</div>
          <div className="w-[110px] h-[33px] text-indigo-950 text-xs font-normal font-['Poppins']">1240px x 284px</div>
          <div className="w-[234px] h-[213px] p-[50px] rounded-[10px] border border-gray-500 flex-col justify-center items-center gap-9 flex">
            <div className="w-[100px] h-[100px] relative" />
            <div className="p-2.5 rounded-[10px] justify-center items-center gap-2.5 inline-flex">
              <div className="w-6 h-6 p-1 justify-center items-center flex" />
              <div className="text-center text-gray-500 text-base font-normal font-['Poppins']">Upload Image</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start inline-flex">
          <div className="text-indigo-950 text-base font-semibold font-['Poppins']">Slide 2</div>
          <div className="w-[110px] h-[33px] text-indigo-950 text-xs font-normal font-['Poppins']">1240px x 284px</div>
          <div className="w-[234px] h-[213px] p-[50px] rounded-[10px] border border-gray-500 flex-col justify-center items-center gap-9 flex">
            <div className="w-[100px] h-[100px] relative" />
            <div className="p-2.5 rounded-[10px] justify-center items-center gap-2.5 inline-flex">
              <div className="w-6 h-6 p-1 justify-center items-center flex" />
              <div className="text-center text-gray-500 text-base font-normal font-['Poppins']">Upload Image</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start inline-flex">
          <div className="text-indigo-950 text-base font-semibold font-['Poppins']">Slide 3</div>
          <div className="w-[110px] h-[33px] text-indigo-950 text-xs font-normal font-['Poppins']">1240px x 284px</div>
          <div className="w-[234px] h-[213px] p-[50px] rounded-[10px] border border-gray-500 flex-col justify-center items-center gap-9 flex">
            <div className="w-[100px] h-[100px] relative" />
            <div className="p-2.5 rounded-[10px] justify-center items-center gap-2.5 inline-flex">
              <div className="w-6 h-6 p-1 justify-center items-center flex" />
              <div className="text-center text-gray-500 text-base font-normal font-['Poppins']">Upload Image</div>
            </div>
          </div>
          <div className="justify-start items-start gap-3.5 inline-flex mt-4">
            <button
              className={`px-[25px] py-2.5 rounded-[10px] border-2 border-violet-600 justify-center items-center gap-2.5 flex ${onClose ? 'text-gray-500' : ''}`}
              onClick={handleCancel}
            >
              <div className={`text-violet-600 text-base font-semibold font-['Poppins'] ${onClose ? 'text-gray-500' : ''}`}>Cancel</div>
            </button>
            <button
              className={`px-[25px] py-2.5 bg-violet-600 rounded-[10px] justify-center items-center gap-2.5 flex ${onClose ? 'text-gray-500' : ''}`}
              onClick={handleSave}
            >
              <div className={`text-stone-50 text-base font-semibold font-['Poppins'] ${onClose ? 'text-gray-500' : ''}`}>Save</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PasswordPopup({ onClose }) {
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const handleCancel = () => {
    onClose();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRetypePasswordVisibility = () => {
    setShowRetypePassword(!showRetypePassword);
  };

  return (
    <div className="popup-container-password">
      <button className="close-btn" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className="w-[max] h-[max] px-[26px] py-8 bg-white rounded-[15px] flex-col justify-start items-end gap-[19px] inline-flex">
        <div className="flex-col justify-start items-start gap-[5px] flex">
          <div className="text-indigo-950 text-sm font-semibold font-['Poppins']">Type your new password</div>
          <div className="relative flex items-center w-[718px]">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your new password"
              className="w-full pl-[21px] pr-[40px] py-3 bg-white rounded-[10px] shadow justify-start items-center gap-2.5 inline-flex"
              id="passwordInput"
            />
            <button
              className="absolute right-[10px] top-1/2 transform -translate-y-1/2"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        <div className="flex-col justify-start items-start gap-[5px] flex">
          <div className="text-indigo-950 text-sm font-semibold font-['Poppins']">Retype your new password</div>
          <div className="relative flex items-center w-[718px]">
            <input
              type={showRetypePassword ? 'text' : 'password'}
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              placeholder="Retype your new password"
              className="w-full pl-[21px] pr-[40px] py-3 bg-white rounded-[10px] shadow justify-start items-center gap-2.5 inline-flex"
              id="retypePasswordInput"
            />
            <button
              className="absolute right-[10px] top-1/2 transform -translate-y-1/2"
              onClick={toggleRetypePasswordVisibility}
            >
              <FontAwesomeIcon icon={showRetypePassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        <div className="justify-start items-start gap-3.5 inline-flex">
          <button
            className={`px-[25px] py-2.5 rounded-[10px] border-2 border-violet-600 justify-center items-center gap-2.5 flex ${onClose ? 'text-gray-500' : ''}`}
            onClick={handleCancel}
          >
            <div className={`text-violet-600 text-base font-semibold font-['Poppins'] ${onClose ? 'text-gray-500' : ''}`}>Cancel</div>
          </button>
          <button className={`px-[25px] py-2.5 bg-violet-600 rounded-[10px] justify-center items-center gap-2.5 flex ${onClose ? 'text-gray-500' : ''}`}>
            <div className={`text-stone-50 text-base font-semibold font-['Poppins'] ${onClose ? 'text-gray-500' : ''}`}>Save</div>
          </button>
        </div>
      </div>
    </div>
  );
}

function Settings() {
  const [showBannerPopup, setShowBannerPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

  const openBannerPopup = () => {
    setShowBannerPopup(true);
    setShowPasswordPopup(false);
  };

  const openPasswordPopup = () => {
    setShowPasswordPopup(true);
    setShowBannerPopup(false);
  };

  return (
    <div> 
      <div className="settings-content">
        <div className="left-[345px] top-[69px] absolute text-black text-xl font-normal font-['Poppins']">Admin Infinite Learning Shop</div>
        <div className="left-[345px] top-[30px] absolute text-violet-600 text-[32px] font-bold font-['Poppins']">Settings</div>
        <div className="left-[345px] top-[129px] absolute flex-col justify-start items-start gap-4 inline-flex">
          <div className={`w-[1030px] pl-6 pr-10 py-[30px] bg-${showBannerPopup ? 'gray-300' : 'white'} rounded-[15px] shadow justify-start items-center gap-[781px] inline-flex`}>
            <div className="text-indigo-950 text-lg font-semibold font-['Poppins']">
              <button className="text-indigo-950 text-lg font-semibold font-['Poppins']"  style={{ fontSize: '17px' }} onClick={openBannerPopup}>Change Banner</button>
            </div>
            <div className="justify-start items-start gap-2.5 flex">
              <button
                className={`w-[27px] h-[27px] bg-purple-300 rounded-full flex items-center justify-center ${showBannerPopup ? 'text-gray-700' : 'text-black'}`}
                onClick={openBannerPopup}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
          <div className={`w-[1030px] pl-6 pr-[52px] py-[30px] bg-${showPasswordPopup ? 'gray-300' : 'white'} rounded-[15px] shadow justify-start items-center gap-[758px] inline-flex`}>
            <div className="text-indigo-950 text-lg font-semibold font-['Poppins']">
              <button className="text-indigo-950 text-lg font-semibold font-['Poppins']" style={{ fontSize: '17px' }} onClick={openPasswordPopup}>Change Password</button>
            </div>
            <div className="justify-start items-start gap-2.5 flex">
              <button
                className={`w-[27px] h-[27px] bg-purple-300 rounded-full flex items-center justify-center ${showPasswordPopup ? 'text-gray-700' : 'text-black'}`}
                onClick={openPasswordPopup}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
          {showBannerPopup && <BannerPopup onClose={() => setShowBannerPopup(false)} />}
          {showPasswordPopup && <PasswordPopup onClose={() => setShowPasswordPopup(false)} />}
        </div>
      </div>
    </div>
  );
}

export default Settings;


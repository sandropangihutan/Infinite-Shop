import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/myprofile.css";
import "../../assets/css/swipebuttonsave.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@iconify/react";
import { LogOut, reset, getMe } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";

function MyProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("profile");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setProfileImage(user.url); // Assuming the API returns the profile image URL
    }
  }, [user]);

  const handleProfileClick = () => {
    setActiveButton("profile");
  };

  const handleOrdersClick = () => {
    setActiveButton("orders");
    navigate("/MyOrder");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);
    setUploadingImage(true);

    try {
      const response = await axios.patch(
        "http://localhost:3000/updateProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setProfileImage(URL.createObjectURL(file));
        setShowSuccessModal(true);
      } else {
        setErrorData(response.data);
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      setShowErrorModal(true);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/updateProfile",
        {
          name,
          email,
          phone,
          currentPassword,
          newPassword,
        }
      );
      if (response.status === 200) {
        setShowSuccessModal(true);
      } else {
        setErrorData(response.data);
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setShowErrorModal(true);
    }
  };

  return (
    <div className="my-profile-container">
      <Navbar />
      <div className="profile-header">My Profile</div>

      <div className="profile-buttons-container">
        <div className="flex flex-col gap-4">
          <button
            className={`button-my-profile ${activeButton === "profile" ? "active" : ""
              }`}
            onClick={handleProfileClick}
          >
            <div
              className={`icon-container ${activeButton === "profile" ? "icon-active" : "icon-inactive"
                }`}
            >
              <Icon icon="gg:profile" />
            </div>
            <div
              className={`text-my-profile ${activeButton === "profile" ? "text-active" : "text-inactive"
                }`}
            >
              My Profile
            </div>
          </button>
          <button
            className={`button-my-orders ${activeButton === "orders" ? "active" : ""
              }`}
            onClick={handleOrdersClick}
          >
            <div
              className={`icon-container ${activeButton === "orders" ? "icon-active" : "icon-inactive"
                }`}
            >
              <Icon icon="fluent:box-24-regular" />
            </div>
            <div
              className={`text-my-orders ${activeButton === "orders" ? "text-active" : "text-inactive"
                }`}
            >
              My Orders
            </div>
          </button>
          <div className="line-separator"></div>
          <button className="button-log-out" onClick={logout}>
            <div className={`icon-container icon-inactive`}>
              <Icon icon="solar:logout-outline" />
            </div>
            <div className="text-log-out">Log Out</div>
          </button>
        </div>
      </div>

      <div className="Frame109 w-[921px] h-[635px] p-10 bg-white rounded-[20px] border border-violet-600 flex-col justify-start items-start gap-10 inline-flex mt-10">
        <div className="Frame107 justify-start items-center gap-9 inline-flex">
          <div className="Group219 w-[104px] h-[100px] relative">
            <div className="Ellipse10 w-[100px] h-[100px] left-0 top-0 absolute bg-purple-100 rounded-full overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-purple-100 rounded-full" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profileImageInput"
              onChange={handleImageChange}
            />
            <label htmlFor="profileImageInput" className="cursor-pointer">
              <div className="Group204 w-7 h-7 left-[76px] top-[60px] absolute">
                <div className="Ellipse11 w-7 h-7 left-0 top-0 absolute bg-violet-600 rounded-full" />
                <FontAwesomeIcon
                  icon={faEdit}
                  className="BasilEditOutline w-5 h-5 left-[4px] top-[4px] absolute"
                  style={{ color: "white" }}
                />
              </div>
            </label>
          </div>
          <div className="text-gray-800 text-xl font-medium font-['Poppins']">
            {user && user.name}
          </div>
        </div>
        <div className="Frame106 flex-col justify-end items-end gap-8 flex">
          <div className="Frame101 justify-start items-center gap-[123px] inline-flex">
            <div className="Name text-gray-800 text-base font-normal font-['Poppins']">
              Name
            </div>
            <input
              type="text"
              className="NameFont Frame90 w-[668px] h-11 px-5 py-3 rounded-[10px] border border-neutral-300 justify-start items-center gap-2.5 flex text-gray-800 text-base font-normal font-['Poppins']"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="Frame103 justify-start items-center gap-[116px] inline-flex">
            <div className="EMail text-gray-800 text-base font-normal font-['Poppins']">
              E-mail
            </div>
            <input
              type="email"
              className="email-text Frame91 w-[668px] h-11 px-5 py-3 rounded-[10px] border border-neutral-300 justify-start items-center gap-2.5 flex text-gray-800 text-base font-normal font-['Poppins']"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="Frame103 justify-start items-center gap-[50px] inline-flex">
            <div className="MobileNumber text-gray-800 text-base font-normal font-['Poppins']">
              Mobile Number
            </div>
            <input
              type="text"
              className="Frame92 w-[668px] h-11 px-5 py-3 rounded-[10px] border border-neutral-300 justify-start items-center gap-2.5 flex text-gray-800 text-base font-normal font-['Poppins']"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="Frame103 justify-start items-center gap-[30px] inline-flex">
            <div className="Password text-gray-800 text-base font-normal font-['Poppins']">
              Current Password
            </div>
            <input
              type="password"
              className="password-text Frame91 w-[668px] h-11 px-5 py-3 rounded-[10px] border border-neutral-300 justify-start items-center gap-2.5 flex text-gray-800 text-base font-normal font-['Poppins']"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="Frame103 justify-start items-center gap-[60px] inline-flex">
            <div className="Password text-gray-800 text-base font-normal font-['Poppins']">
              New Password
            </div>
            <input
              type="password"
              className="password-text Frame91 w-[668px] h-11 px-5 py-3 rounded-[10px] border border-neutral-300 justify-start items-center gap-2.5 flex text-gray-800 text-base font-normal font-['Poppins']"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="swipe2" onClick={handleSave}>
            <span className="text">Save</span>
          </button>
        </div>
      </div>

      {showSuccessModal && (
        <div className="backdrop fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}

      {showSuccessModal && (
        <dialog
          id="my_modal_8"
          className="modal modal-bottom sm:modal-middle border border-gray-300 shadow-lg z-50"
          open
        >
          <div className="w-[551px] h-[360px] relative bg-white rounded-2xl">
            <div className="left-[61.50px] top-[101px] absolute flex-col justify-start items-center gap-5 inline-flex">
              <div className="flex-col justify-start items-center gap-2 flex">
                <div className="text-center text-green-600 text-2xl font-bold font-['Poppins']">
                  OH YEAH !!!
                </div>
                <div className="w-44 text-center text-slate-500 text-sm font-normal font-['Poppins']">
                  Your Account has Updated
                </div>
              </div>
              <div className="self-stretch h-px border border-neutral-500"></div>
              <form
                method="dialog"
                className="w-36 px-10 py-1 bg-green-600 rounded-full justify-center items-center gap-2.5 inline-flex"
              >
                <a
                  href="/MyProfile"
                  className="text-center text-white text-base font-normal font-['Poppins']"
                  onClick={() => setShowSuccessModal(false)}
                >
                  Continue
                </a>
              </form>
            </div>
            <img
              className="w-80 h-80 left-[211px] top-[10px] absolute"
              src="https://i.postimg.cc/HkcTC7BV/JEMPOL.png"
              alt="Success"
            />
          </div>
        </dialog>
      )}

      {showErrorModal && (
        <div className="backdrop fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}

      {showErrorModal && (
        <dialog
          id="my_modal_4"
          className="modal modal-bottom sm:modal-middle border border-gray-300 shadow-lg z-50"
          open
        >
          <div className="w-[551px] h-[360px] relative bg-white rounded-2xl">
            <div className="left-[61.50px] top-[101px] absolute flex-col justify-start items-center gap-5 inline-flex">
              <div className="flex-col justify-start items-center gap-2 flex">
                <div className="text-center text-red-600 text-2xl font-bold font-['Poppins']">
                  Error
                </div>
                <div className="w-44 text-center text-slate-500 text-sm font-normal font-['Poppins']">
                  There was an error updating your profile. Please try again.
                </div>
                {errorData && (
                  <div className="w-44 text-center text-slate-500 text-sm font-normal font-['Poppins']">
                    Error details: {errorData.message}
                  </div>
                )}
              </div>
              <div className="self-stretch h-px border border-neutral-500"></div>
              <button
                className="w-36 px-10 py-1 bg-red-600 rounded-full justify-center items-center gap-2.5 inline-flex text-white text-base font-normal font-['Poppins']"
                onClick={() => setShowErrorModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      <Footer />
    </div>
  );
}

export default MyProfile;

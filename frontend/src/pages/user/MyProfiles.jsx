import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios untuk mengambil data dari API
import "../../assets/css/myprofile.css";
import "../../assets/css/swipebuttonsave.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@iconify/react";
import { LogOut, reset, getMe } from "../../features/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";


function MyProfile() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);
  const [activeButton, setActiveButton] = useState("profile");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch data from API
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Me");
        const data = response.data;
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);


  const handleProfileClick = () => {
    setActiveButton("profile");
  };

  const handleOrdersClick = () => {
    setActiveButton("orders");
    navigate("/MyOrder");
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:3000/Me/update", {
        name,
        email,
        phone,
      });
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
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
          <button className="button-log-out">
            <div className={`icon-container icon-inactive`}>
              <Icon icon="solar:logout-outline" />
            </div>
            <div className="text-log-out">Log Out</div>
          </button>
        </div>
      </div>

      <div className="Frame109 w-[921px] h-[496px] p-10 bg-white rounded-[20px] border border-violet-600 flex-col justify-start items-start gap-10 inline-flex mt-10">
        <div className="Frame107 justify-start items-center gap-9 inline-flex">
          <div className="Group219 w-[104px] h-[100px] relative">
            <div className="Ellipse10 w-[100px] h-[100px] left-0 top-0 absolute bg-purple-100 rounded-full" />
            <div className="Group204 w-7 h-7 left-[76px] top-[60px] absolute">
              <div className="Ellipse11 w-7 h-7 left-0 top-0 absolute bg-violet-600 rounded-full" />
              <FontAwesomeIcon
                icon={faEdit}
                className="BasilEditOutline w-5 h-5 left-[4px] top-[4px] absolute"
                style={{ color: "white" }}
              />
            </div>
          </div>
          <div className="  text-gray-800 text-xl font-medium font-['Poppins']">
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
          <button type="submit" className="swipe2" onClick={handleSave}>
            <span className="text">Save</span>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MyProfile;

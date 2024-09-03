import React, { useState, useEffect, useRef } from "react";
import search from "../assets/search1.svg";
import "../assets/css/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, reset, getMe } from "../features/authSlice";
import CartTab from "../Components/CartTab"; // Import CartTab component

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [notificationStatus, setNotificationStatus] = useState(
    Array(4).fill(false)
  );
  const [imageColor, setImageColor] = useState("text-purple-600");
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeProfileDropdown = (e) => {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeProfileDropdown);
    return () => {
      document.removeEventListener("mousedown", closeProfileDropdown);
    };
  }, []);

  const toggleNotificationsDropdown = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    if (isNotificationsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationsOpen]);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate("/Allproduct");
    }
  };

  const markNotificationAsRead = () => {
    setNotificationStatus(Array(4).fill(true));
    setImageColor("text-black");
  };

  return (
    <div className="nav-item">
      <div className="Navbar ml-20 mt-5 item-center relative">
        <div className="w-[1326px] h-20 px-[60px] bg-white rounded-[40px] shadow border border-violet-600 justify-between items-center inline-flex">
          <Link to="/homepage">
            <div className="text-violet-600 text-2xl font-bold font-['Poppins']">
              <img
                src="/Images/LogoFooter.png"
                alt="Infinite Shop Logo"
                className="w-40 h-auto"
              />
            </div>
          </Link>
          <div className="w-[497px] h-[43px] p-2.5 bg-white rounded-[20px] border border-gray-500 justify-start items-center gap-2.5 flex">
            <div className="bg-white rounded-[10px] justify-center items-center gap-2.5 inline-flex w-full border-none">
              <span
                className="icon"
                style={{
                  fontSize: "12px",
                  visibility: searchText ? "hidden" : "visible",
                }}
              >
                <img
                  src={search}
                  alt="Search Icon"
                  className="mr-1"
                  style={{ width: "14px", height: "14px" }}
                />
              </span>
              <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="max-w-prose bg-inherit w-full border-none outline-none focus:ring-0"
                style={{ color: "black", width: "90%", height: "100%" }}
              />
            </div>
          </div>
          <div className="justify-end items-center gap-8 flex">
            <div className="flex gap-5 justify-between my-auto">
              <div
                className="relative cursor-pointer"
                onClick={handleCartClick}
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/cdc18b712c6f4c9105335c2dd43128ce3634a2ac62e64fd10aaf7c4e9a4d7f44?"
                  className="shrink-0 aspect-[0.97] w-[29px]"
                />
              </div>
              <div className="relative cursor-pointer">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5249a099867f7f49864a3c6e7d0a7b618e9a6076161b50cadf1a82269e7bbe26?"
                  className="shrink-0 aspect-square w-[30px]"
                  onClick={toggleNotificationsDropdown}
                  alt="notifications"
                />
                {isNotificationsOpen && (
                  <div
                    ref={notificationRef}
                    className="absolute top-full right-[-40px] mt-8 z-10 notification-scrollable"
                    style={{
                      width: "500px",
                      overflowY: "auto",
                    }}
                  >
                    <div className="flex flex-col items-center py-7 bg-white rounded-3xl border border-solid shadow-sm border-slate-500 max-w-[500px]">
                      <div className="flex gap-5 px-5 w-full text-violet-600 max-w-[500px] max-md:flex-wrap max-md:max-w-full">
                        <div className="flex-auto text-lg font-medium">
                          Notifications
                        </div>
                        <div className="flex-auto my-auto text-xs text-right">
                          <span
                            className={`cursor-pointer ${imageColor}`}
                            onClick={markNotificationAsRead}
                            style={{
                              color: notificationStatus.some(
                                (status) => !status
                              )
                                ? "#6441a4"
                                : "rgb(112, 128, 144)",
                            }}
                          >
                            Tandai telah dibaca
                          </span>
                        </div>
                      </div>
                      <div className="self-stretch mt-7 w-full border border-solid bg-neutral-300 border-neutral-300 min-h-[1px]" />
                      {notificationStatus.map((read, idx) => (
                        <div
                          key={idx}
                          className={`flex gap-4 mt-2 w-full max-w-[452px] max-md:flex-wrap max-md:max-w-full ${read ? "" : "notification-unread"
                            }`}
                          onClick={() => markNotificationAsRead()}
                        >
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/51dd1b8c70efab91aaf9492ee9f9efe77fb7908241106bd745d26c3f2f454003?"
                            className={`shrink-0 aspect-[0.2] w-[13px] cursor-pointer ${notificationStatus.some((status) => !status)
                                ? "text-purple-600"
                                : "text-gray-500"
                              }`}
                            onClick={markNotificationAsRead}
                          />
                          <div className="flex flex-col grow shrink-0 self-start px-5 basis-0 w-fit max-md:max-w-full">
                            <div className="text-sm text-gray-800">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Nunc vulputate libero et velit interdum.
                            </div>
                            <div className="mt-1 text-xs text-left text-gray-500">
                              4 min ago
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-6 origin-top-left rotate-90 border border-slate-400 mb-5"></div>
            <div className="relative cursor-pointer" ref={profileRef}>
              <div
                className="flex gap-4 items-center text-base whitespace-nowrap text-slate-500"
                onClick={toggleProfileDropdown}
              >
                {user && user.image ? (
                  <img
                    loading="lazy"
                    src={`http://localhost:3000/images/profile/${user.image}`}
                    alt="Profile"
                    className="shrink-0 self-stretch w-11 h-11 bg-purple-100 rounded-full"
                  />
                ) : (
                  <div className="shrink-0 self-stretch w-11 h-11 bg-purple-100 rounded-full" />
                )}
                <div className="self-stretch my-auto">{user && user.name}</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c53c38403a5466f4c91eb47151e6a168353ce79e5987f67fcb1da9ba0d784e69?"
                  className="shrink-0 self-stretch my-auto w-6 aspect-square"
                />
              </div>
              {isProfileOpen && (
                <div className="absolute top-full right-[-2px] mt-9 z-10 ">
                  <div className="flex flex-col items-center pt-3 pb-2 bg-white rounded-2xl border border-solid shadow-sm border-purple-400 max-w-[300px]">
                    <div className="flex gap-6 whitespace-nowrap">
                      {user && user.image ? (
                        <img
                          loading="lazy"
                          src={`http://localhost:3000/images/profile/${user.image}`}
                          alt="Profile"
                          className="shrink-0 w-11 h-11 bg-purple-100 rounded-full ml-9"
                        />
                      ) : (
                        <div className="shrink-0 w-11 h-11 bg-purple-100 rounded-full ml-9" />
                      )}
                      <div className="flex flex-col pr-6 mr-11">
                        <div className="text-base text-gray-800">
                          {user && user.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {user && user.email}
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch mt-2 w-full bg-gray-300 border border-gray-300 border-solid min-h-[1px]" />
                    <div
                      className="flex gap-4 py-2 pr-2 mt-2 max-w-full text-sm text-purple-600 rounded-xl w-[256px] profile-option"
                      style={{ paddingLeft: "1rem" }}
                    >
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b225cdd9735ddba3b8119aa28515b050efb0141a9881daf51fa8285c0a624730?"
                        className="shrink-0 my-auto w-4 aspect-square w-[20px]"
                      />
                      <Link to="/MyProfile" className="flex-1">
                        <div className="ml-2">My Profile</div>
                      </Link>
                    </div>
                    <div
                      className="flex gap-4 py-2 pr-2 mt-2 max-w-full text-sm text-purple-600 rounded-xl w-[256px] profile-option"
                      style={{ paddingLeft: "1rem" }}
                    >
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e85608d85430340313c7ca7796b8df14ef5b1cd9b48a6a8904afe765439bb32f?"
                        className="shrink-0 my-auto w-4 aspect-square w-[20px]"
                      />
                      <Link to="/MyOrder" className="flex-1">
                        <div className="ml-2">My Order</div>
                      </Link>
                    </div>
                    <div className="self-stretch mt-1 w-full bg-gray-300 border border-gray-300 border-solid min-h-[1px]" />
                    <div
                      className="flex gap-3 py-2 pr-2 mt-1 max-w-full text-sm text-purple-600 rounded-xl w-[256px] profile-option"
                      onClick={logout}
                      style={{ paddingLeft: "1rem" }}
                    >
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e7adad149c3cc9c29f76a83a718a478fe5198ba18f721e47cac5671bdee57de?"
                        className="shrink-0 my-auto w-4 aspect-square w-[20px]"
                      />
                      <div className="ml-2">Log Out</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <CartTab
              isCartOpen={isCartOpen}
              closeCartSidebar={() => setIsCartOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import logo from "../assets/logo.png";
import home from "../assets/home.svg";
import product from "../assets/product.svg";
import message from "../assets/message.svg";
import orders from "../assets/orders.svg";
import settings from "../assets/settings.svg";
import users from "../assets/users.svg";
import Glogout from "../assets/logout.svg";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  const liItemsRef = useRef(null);
  const sideBarMenuRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const liItems = liItemsRef.current.querySelectorAll("li");
    const sideBarMenu = sideBarMenuRef.current;
    const wrapper = wrapperRef.current;

    liItems.forEach(function (li_main) {
      li_main.addEventListener("click", function () {
        liItems.forEach(function (li) {
          li.classList.remove("active");
        });
        li_main.classList.add("active");
      });
    });

    sideBarMenu.addEventListener("click", function () {
      wrapper.classList.toggle("active");
    });

    return () => {
      liItems.forEach(function (li_main) {
        li_main.removeEventListener("click", function () {
          liItems.forEach(function (li) {
            li.classList.remove("active");
          });
          li_main.classList.add("active");
        });
      });

      sideBarMenu.removeEventListener("click", function () {
        wrapper.classList.toggle("active");
      });
    };
  }, []);

  return (
    <div className="" ref={wrapperRef}>
      <div className="shadow"></div>
      <div className="side_bar">
        <div className="side_bar_top">
          <div className="logo_wrap">
            <img
              src={logo}
              alt="logo"
              style={{
                width: "160px",
                height: "auto",
                position: "absolute",
                top: "0",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
            <span className="text"></span>
          </div>
        </div>
        <div className="side_bar_bottom">
          <ul ref={liItemsRef}>
            <li className="active">
              <span className="top_curve"></span>
              <Link to="/Dashboard">
                <span className="icon">
                  {" "}
                  <img src={home} alt="home" />
                </span>
                <span className="item">Dashboard</span>
              </Link>
              <span className="bottom_curve"></span>
            </li>
            <li>
              <span className="top_curve"></span>
              <Link to="/Product">
                <span className="icon">
                  <img src={product} alt="product" />
                </span>
                <span className="item">Product</span>
              </Link>
              <span className="bottom_curve"></span>
            </li>
            <li>
              <span className="top_curve"></span>
              <Link to="/Orders">
                <span className="icon">
                  <img src={orders} alt="orders" />
                </span>
                <span className="item">Orders</span>
              </Link>
              <span className="bottom_curve"></span>
            </li>
            <li>
              <span className="top_curve"></span>
              <Link to="/Message">
                <span className="icon">
                  <img src={message} alt="message" />
                </span>
                <span className="item">Message</span>
              </Link>
              <div className="notification">3</div>
              <span className="bottom_curve"></span>
            </li>
            <li>
              <span className="top_curve"></span>
              <Link to="/Users">
                <span className="icon">
                  <img src={users} alt="users" />
                </span>
                <span className="item">Users</span>
              </Link>
              <span className="bottom_curve"></span>
            </li>
            <li>
              <span className="top_curve"></span>
              <Link to="/Settings">
                <span className="icon">
                  <img src={settings} alt="settings" />
                </span>
                <span className="item">Settings</span>
              </Link>
              <span className="bottom_curve"></span>
            </li>

            <li style={{ marginTop: "200px" }}>
              <span className="top_curve"></span>
              <div
                style={{ width: 194, height: 0, border: "1px white solid" }}
              ></div>
              <Link to="/login">
                <span className="icon">
                  <img src={Glogout} alt="logout" />
                </span>
                <button onClick={logout} className="button is-light">
                  Log out
                </button>
              </Link>
              <span className="bottom_curve"></span>
            </li>
          </ul>
        </div>
      </div>
      <div className="side_bar_menu" ref={sideBarMenuRef}></div>
    </div>
  );
}

export default Sidebar;

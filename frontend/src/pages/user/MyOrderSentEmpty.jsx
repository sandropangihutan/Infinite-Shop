import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/myorderempty.css";
import "../../assets/css/swipebuttonorder.css";
import { Icon } from "@iconify/react";
import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
import BingungImage from "../../assets/BINGUNG.png";

function MyOrderSentEmpty() {
    const [activeButton, setActiveButton] = useState('orders');
    const navigate = useNavigate();

    const handleProfileClick = () => {
        setActiveButton('profile');
        navigate("/MyProfile");
    };

    const handleOrdersClick = () => {
        setActiveButton('orders');
        navigate("/MyOrder");
    };

    const logout = () => {
        navigate("/");
    };

    const handleGoBackShopping = () => {
        navigate("/");
    };

    return (
        <div className="my-order-container">
            <Navbar />
            <div className="order-header">My Orders</div>

            <div className="profile-buttons-container">
                <div className="flex flex-col gap-4">
                    <button
                        className={`button-my-profile ${activeButton === 'profile' ? 'active' : ''}`}
                        onClick={handleProfileClick}
                    >
                        <div className={`icon-container ${activeButton === 'profile' ? 'icon-active' : 'icon-inactive'}`}>
                            <Icon icon="gg:profile" />
                        </div>
                        <div className={`text-my-profile ${activeButton === 'profile' ? 'text-active' : 'text-inactive'}`}>My Profile</div>
                    </button>
                    <button
                        className={`button-my-orders ${activeButton === 'orders' ? 'active' : ''}`}
                        onClick={handleOrdersClick}
                    >
                        <div className={`icon-container ${activeButton === 'orders' ? 'icon-active' : 'icon-inactive'}`}>
                            <Icon icon="fluent:box-24-regular" />
                        </div>
                        <div className={`text-my-orders ${activeButton === 'orders' ? 'text-active' : 'text-inactive'}`}>My Orders</div>
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

            <div className="OrderStatus">
                <div className="BarOrderStatus">
                    <div className="Status text-gray-800 text-base font-semibold font-['Poppins']">Status</div>
                    <button className="Frame10058 w-[110px] h-8 px-4 py-1 rounded-md border border-neutral-300 justify-center items-center gap-2.5 inline-flex" onClick={() => navigate('/MyOrderEmpmty')}>
                        <div className="OnPack text-indigo-950 text-base font-normal font-['Poppins']">On Pack</div>
                    </button>
                    <button className="Frame10057 w-[68px] h-8 px-4 py-1 bg-amber-400 rounded-md justify-center items-center gap-2.5 inline-flex" onClick={() => navigate('/MyOrderSentEmpty')}>
                        <div className="Sentk text-violet-900 text-base font-semibold font-['Poppins']">Sent</div>
                    </button>
                    <button className="Frame10059 w-[98px] h-8 px-4 py-1 rounded-md border border-neutral-300 justify-center items-center gap-2.5 inline-flex" onClick={() => navigate('/MyOrderFinishedEmpty')}>
                        <div className="Finished text-indigo-950 text-base font-normal font-['Poppins']">Finished</div>
                    </button>
                </div>
                <div className="Frame10053">
                    <img className="Bingung" src={BingungImage} alt="No orders" />
                    <div className="NoOrderYet text-center text-gray-800 text-base font-normal font-['Poppins']">Hmm....<br />Looks like you still have no order yet</div>
                    <button type="submit" className="swipe2" onClick={handleGoBackShopping}>
                        <span className="text">Go Back Shopping</span>
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default MyOrderSentEmpty;

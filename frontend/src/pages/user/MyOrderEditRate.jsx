import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/myorder.css";
import "../../assets/css/swipebuttonorder.css";
import { Icon } from "@iconify/react";
import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
import { FaStar } from "react-icons/fa";

function MyOrderEditRate() {
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

    const [showPopup, setShowPopup] = useState(false);
    const [ratings, setRatings] = useState([0, 0, 0]); // Initial ratings for each product

    const handleRate = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setShowConfirmationPopup(false);
    };

    const handleProductRating = (index, rating) => {
        const newRatings = [...ratings];
        newRatings[index] = rating;
        setRatings(newRatings);
    };

    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
    const [ratingText, setRatingText] = useState('');

    const handleRateConfirmation = () => {
        // Simpan rating ke local storage
        localStorage.setItem('ratings', JSON.stringify(ratings));

        setShowPopup(false); // Tutup pop-up rating
        setShowConfirmationPopup(true); // Tampilkan pop-up konfirmasi
    };


    const logout = () => {
        navigate("/");
    };

    return (
        <div>
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
                        <button className="Frame10058 w-[110px] h-8 px-4 py-1 rounded-md border border-neutral-300 justify-center items-center gap-2.5 inline-flex" onClick={() => navigate('/MyOrder')}>
                            <div className="OnPack text-indigo-950 text-base font-normal font-['Poppins']">On Pack</div>
                        </button>
                        <button className="Frame10059 w-[68px] h-8 px-4 py-1 rounded-md border border-neutral-300 justify-center items-center gap-2.5 inline-flex" onClick={() => navigate('/MyOrderSent')}>
                            <div className="Sent text-indigo-950 text-base font-normal font-['Poppins']">Sent</div>
                        </button>
                        <button className="Frame10057 w-[98px] h-8 px-4 py-1 bg-amber-400 rounded-md justify-center items-center gap-2.5 inline-flex" onClick={() => navigate('/MyOrderFinished')}>
                            <div className="Finished text-violet-900 text-base font-semibold font-['Poppins']">Finished</div>
                        </button>
                    </div>

                    <div className="Frame10053 w-[927px] h-[774px] py-6 bg-white rounded-[10px] border border-neutral-300 flex-col justify-start items-center gap-6 inline-flex">
                        <div className="Frame9973 w-[879px] justify-between items-center inline-flex">
                            <div className="OrderId12345678910 text-gray-800 text-xl font-medium font-['Poppins']">Order ID : 12345678910</div>
                            <div className="OrderDate03April2024 text-right">
                                <span className="text-gray-800 text-base font-normal font-['Poppins']">Order Date: </span>
                                <span className="text-gray-800 text-base font-medium font-['Poppins']">03 April 2024</span>
                            </div>
                        </div>
                        <div className="Line47 w-[927px] h-[0px] border border-neutral-300"></div>
                        <div className="Frame10050 w-[878px] justify-between items-end inline-flex">
                            <div className="Frame10047 justify-start items-start gap-6 flex">
                                <div className="Group2282 w-20 h-20 relative">
                                    <div className="Rectangle3 w-20 h-20 left-0 top-0 absolute rounded-[10px] border border-gray-300" />
                                    <img
                                        loading="lazy"
                                        srcSet="Images/Sideeye.png"
                                        className="shrink-0 w-20 aspect-square rounded-xl"
                                    />
                                </div>
                                <div className="Frame10062 flex-col justify-center items-start gap-[7px] inline-flex">
                                    <div className="IloSiPausStickers text-gray-800 text-base font-medium font-['Poppins']">ILO si Paus Stickers</div>
                                    <div className="Variant1 text-gray-800 text-sm font-normal font-['Poppins']">Variant : 1</div>
                                    <div className="Qty1pcs text-gray-800 text-sm font-normal font-['Poppins']">Qty : 1pcs</div>
                                </div>
                            </div>
                            <div className="Rp5000 text-right text-gray-800 text-lg font-semibold font-['Poppins']">Rp 5.000</div>
                        </div>
                        <div className="Frame10051 w-[878px] justify-between items-end inline-flex">
                            <div className="Frame10048 justify-start items-start gap-6 flex">
                                <div className="Group2283 w-20 h-20 relative">
                                    <div className="Rectangle4 w-20 h-20 left-0 top-0 absolute rounded-[10px] border border-gray-300" />
                                    <img
                                        loading="lazy"
                                        srcSet="Images/Design5.png"
                                        className="shrink-0 w-20 aspect-square rounded-xl"
                                    />
                                </div>
                                <div className="Frame10062 flex-col justify-center items-start gap-[7px] inline-flex">
                                    <div className="IlTShirtVer1 text-gray-800 text-base font-medium font-['Poppins']">IL T-Shirt ver.1</div>
                                    <div className="VariantWhiteSizeL text-gray-800 text-sm font-normal font-['Poppins']">Variant : White | Size : L</div>
                                    <div className="Qty1pcs text-gray-800 text-sm font-normal font-['Poppins']">Qty : 1pcs</div>
                                </div>
                            </div>
                            <div className="Rp80000 text-right text-gray-800 text-lg font-semibold font-['Poppins']">Rp 80.000</div>
                        </div>
                        <div className="Frame10052 w-[878px] justify-between items-end inline-flex">
                            <div className="Frame10049 justify-start items-start gap-6 flex">
                                <div className="Group2284 w-20 h-20 relative">
                                    <div className="Rectangle5 w-20 h-20 left-0 top-0 absolute rounded-[10px] border border-gray-300" />
                                    <img
                                        loading="lazy"
                                        srcSet="Images/Lanyardpurple.png"
                                        className="shrink-0 w-20 aspect-square rounded-xl"
                                    />
                                </div>
                                <div className="Frame10065 h-20 flex-col justify-between items-start inline-flex">
                                    <div className="IlLanyardVer1 text-gray-800 text-base font-medium font-['Poppins']">IL Lanyard ver.1</div>
                                    <div className="Qty1pcs text-gray-800 text-sm font-normal font-['Poppins']">Qty : 1pcs</div>
                                </div>
                            </div>
                            <div className="Rp20000 text-right text-gray-800 text-lg font-semibold font-['Poppins']">Rp 20.000</div>
                        </div>
                        <div className="Line48 w-[927px] h-[0px] border border-neutral-300"></div>
                        <div className="Frame9928 w-[879px] justify-between items-start inline-flex">
                            <div className="Frame9927 w-[418px] flex-col justify-start items-start gap-4 inline-flex">
                                <div className="Frame9926 h-[67px] flex-col justify-start items-start gap-1 flex">
                                    <div className="Customer text-gray-800 text-lg font-medium font-['Poppins']">Customer</div>
                                    <div className="TextFullName text-gray-800 text-base font-normal font-['Poppins']">Full Name</div>
                                    <div className="PhoneNumber123456789012 text-gray-800 text-base font-normal font-['Poppins']">Phone Number : 123456789012</div>
                                </div>
                                <div className="Frame10041 h-[88px] flex-col justify-start items-start gap-1 flex">
                                    <div className="Address text-slate-500 text-sm font-normal font-['Poppins']">Address</div>
                                    <div className="JalanTamanJerukMasBaratSrengsengKembanganSpecialCapitalRegionOfJakarta11620 w-[388px] text-gray-800 text-base font-normal font-['Poppins']">Jalan Taman Jeruk Mas Barat, Srengseng, Kembangan, Special Capital Region of Jakarta, 11620</div>
                                </div>
                                <div>
                                    <div className="Frame10041 h-[49px] flex-col justify-start items-start gap-2 flex">
                                        <div className="DeliveryMethod text-slate-500 text-sm font-normal font-['Poppins']">Delivery Method</div>
                                        <div className="RegularShippingJTExpress text-right text-gray-800 text-base font-normal font-['Poppins']">Regular Shipping (J&T Express)</div>
                                    </div>
                                </div>
                                <div className="Line49 w-[870px] h-[0px] border border-neutral-300"></div>
                                <div className="OrderReceivedOn08042024 text-gray-800 text-base font-normal font-['Poppins']">Order Received on 08-04-2024</div>
                            </div>
                            <div className="Frame10042 flex-col justify-start items-start gap-6 inline-flex" style={{ marginLeft: "50px" }}>
                                <div className="Frame9926 h-[67px] flex-col justify-start items-start gap-4 flex">
                                    <div className="Payment text-gray-800 text-lg font-medium font-['Poppins']">Payment</div>
                                    <div className="Frame9924 w-[418px] justify-between items-start inline-flex">
                                        <div className="VirtualAccountBilling text-gray-800 text-base font-normal font-['Poppins']">Virtual Account Billing</div>
                                        <div className=" text-right text-gray-800 text-base font-medium font-['Poppins']">1234567891234</div>
                                    </div>
                                </div>
                                <div className="Frame9928 h-[133px] flex-col justify-start items-start gap-4 flex">
                                    <div className="OrderSummary text-gray-800 text-lg font-medium font-['Poppins']">Order Summary</div>
                                    <div className="Frame10043 flex-col justify-start items-start gap-2 flex">
                                        <div className="Frame9924 w-[418px] justify-between items-start inline-flex">
                                            <div className="Subtotal text-gray-800 text-sm font-normal font-['Poppins']">Subtotal</div>
                                            <div className="Rp105000 text-right text-gray-800 text-sm font-normal font-['Poppins']">Rp 200.000</div>
                                        </div>
                                        <div className="Frame9925 w-[418px] justify-between items-start inline-flex">
                                            <div className="Shipping text-gray-800 text-sm font-normal font-['Poppins']">Shipping</div>
                                            <div className="Rp30000 text-right text-gray-800 text-sm font-normal font-['Poppins']">Rp 30.000</div>
                                        </div>
                                        <div className="Line62 w-[418px] h-[0px] border border-neutral-300"></div>
                                        <div className="Frame9926 w-[418px] justify-between items-start inline-flex">
                                            <div className="Total text-gray-800 text-base font-medium font-['Poppins']">Total</div>
                                            <div className="Rp135000 text-right text-gray-800 text-base font-medium font-['Poppins']">Rp 230.000</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="Line50"></div>
                                <button className="Frame9930 w-[175px] h-10 px-6 py-2 bg-violet-600 rounded-md justify-center items-center gap-2.5 inline-flex" onClick={handleRate} style={{ marginLeft: "245px" }}>
                                    <div className="OrderReceived text-white text-base font-semibold font-['Poppins']">Edit Rate</div>
                                </button>

                                {/* Pop-up for rating */}
                                {showPopup && (
                                    <div className="popup-overlay">
                                        <div className="popup-content">
                                            <div className="popup-header">
                                                <h2 className="popup-title">Rate Order</h2>
                                                <button>
                                                    <div className="relative flex items-center justify-center w-8 h-8 border border-gray-800 rounded-full cursor-pointer" onClick={handleClosePopup}>
                                                        <Icon icon="fa-solid:times" className="text-gray-800" />
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="popup-body">
                                                {['ILO si Paus Stickers', 'IL T-Shirt ver.1', 'Lanyard'].map((product, index) => (
                                                    <div key={index} className="flex flex-col grow shrink-0 py-0.5 basis-0 w-full max-md:max-w-full">
                                                        <div className="flex gap-5 justify-between self-start text-gray-800">
                                                            <img
                                                                loading="lazy"
                                                                srcSet={`Images/${index === 0 ? 'Sideeye' : index === 1 ? 'Design5' : 'Lanyardpurple'}.png`}
                                                                className="product-image"
                                                            />
                                                            <div className="flex flex-col justify-center px-5 my-auto">
                                                                <div className="text-base font-medium">{product}</div>
                                                                <div className="mt-2 text-sm">Variant: 1</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-4 self-start px-5 mt-4">
                                                            <div className="text-sm text-neutral-800">Product Quality</div>
                                                            <div className="flex gap-2 my-auto">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <FaStar
                                                                        key={star}
                                                                        size={20}
                                                                        color={star <= ratings[index] ? "#ffc107" : "#e4e5e9"}
                                                                        onClick={() => handleProductRating(index, star)}
                                                                        className="shrink-0 aspect-square w-[17px]"
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="justify-center items-start p-4 mt-4 text-sm rounded-xl border border-solid border-neutral-300 text-slate-500 max-md:pr-5 max-md:mr-0.5 max-md:max-w-full h-24 textarea-wrapper w-full">
                                                            <textarea
                                                                className="w-full h-full"
                                                                placeholder="Share your rating about this product to help other Buyers."
                                                                rows={4}
                                                            />
                                                        </div>
                                                        <div className="shrink-0 mt-6 h-px border border-solid bg-zinc-200 border-zinc-200 max-md:max-w-full w-full" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="popup-footer">
                                                <div className="flex gap-4 px-8 py-6 mt-3 text-sm text-center whitespace-nowrap bg-white rounded-none border-t border-solid border-neutral-300 text-indigo-950 max-md:flex-wrap max-md:px-5">
                                                    <div className="justify-center px-6 py-2 rounded-xl border border-amber-400 border-solid max-md:px-5" style={{ marginLeft: "430px" }}>
                                                        <button onClick={handleClosePopup}>Later</button>
                                                    </div>
                                                    <div className="justify-center px-6 py-2 font-medium bg-amber-400 rounded-xl max-md:px-5">
                                                        <button onClick={handleRateConfirmation}>OK</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {showConfirmationPopup && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                        <div className="py-2.5 pl-16 bg-white rounded-3xl max-w-[551px] max-md:pl-5">
                                            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                                <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                                                    <div className="flex flex-col self-stretch my-auto text-center max-md:mt-10">
                                                        <div className="self-center text-2xl font-bold text-green-600">
                                                            OH YEAH !!!
                                                        </div>
                                                        <div className="YourOrderRatingHasBeenSaved w-[171px] text-center text-slate-500 text-sm font-normal font-['Poppins']">
                                                            Your order rating has been saved
                                                        </div>
                                                        <button>
                                                            <div
                                                                className="justify-center px-9 py-1 mt-10 text-base text-white whitespace-nowrap bg-green-600 rounded-[100px] max-md:px-5 cursor-pointer"
                                                                onClick={handleClosePopup}
                                                            >
                                                                Continue
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full">
                                                    <img
                                                        loading="lazy"
                                                        srcSet="https://i.postimg.cc/HkcTC7BV/JEMPOL.png"
                                                        className="w-full aspect-square max-md:mt-2.5"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default MyOrderEditRate;

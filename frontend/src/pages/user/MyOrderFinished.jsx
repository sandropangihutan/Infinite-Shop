import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/myorder.css";
import "../../assets/css/swipebuttonorder.css";
import { Icon } from "@iconify/react";
import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
import { useSelector } from "react-redux";
import BingungImage from "../../assets/BINGUNG.png";

function MyOrderFinished() {
    const [activeButton, setActiveButton] = useState("orders");
    const [orders, setOrders] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const userId = user ? user.id : null;
    
    useEffect(() => {
      if (userId) {
        fetchOrders();
      }
    }, [userId]);
  
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/payment/userstatus",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );
    
        if (!response.ok) {
          console.error("Error fetching orders, status:", response.status);
          return;
        }
    
        const data = await response.json();
    
        const filteredOrders = data.filter(order => order.orderStatus === "Finished");
    
        const parsedOrders = filteredOrders.map((order) => ({
          ...order,
          items: JSON.parse(order.items),
        }));
    
        setOrders(parsedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    const handleProfileClick = () => {
      setActiveButton("profile");
      navigate("/MyProfile");
    };
  
    const handleOrdersClick = () => {
      setActiveButton("orders");
      navigate("/MyOrder");
    };
  
    const logout = () => {
      navigate("/homepage");
    };
  
    const handleClosePopup = () => {
      setShowPopup(false);
    };
  
    const handleCancel = () => {
      setShowPopup(true);
    };

    const handleGoBackShopping = () => {
        navigate("/"); // Adjust this according to your shopping route
      };
  
  const formatDate = (rawDate) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = new Date(rawDate).toLocaleDateString("id-ID", options);
      return formattedDate;
    };
  
    console.log(orders)
  
    return (
      <div>
        <div className="my-order-container">
          <Navbar />
          <div className="order-header">My Orders</div>
          <div className="profile-buttons-container">
            <div className="flex flex-col gap-4">
              <button
                className={`button-my-profile ${
                  activeButton === "profile" ? "active" : ""
                }`}
                onClick={handleProfileClick}
              >
                <div
                  className={`icon-container ${
                    activeButton === "profile" ? "icon-active" : "icon-inactive"
                  }`}
                >
                  <Icon icon="gg:profile" />
                </div>
                <div
                  className={`text-my-profile ${
                    activeButton === "profile" ? "text-active" : "text-inactive"
                  }`}
                >
                  My Profile
                </div>
              </button>
              <button
                className={`button-my-orders ${
                  activeButton === "orders" ? "active" : ""
                }`}
                onClick={handleOrdersClick}
              >
                <div
                  className={`icon-container ${
                    activeButton === "orders" ? "icon-active" : "icon-inactive"
                  }`}
                >
                  <Icon icon="fluent:box-24-regular" />
                </div>
                <div
                  className={`text-my-orders ${
                    activeButton === "orders" ? "text-active" : "text-inactive"
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
  
          <div className="OrderStatus">
            <div className="BarOrderStatus">
              <div className="Status text-gray-800 text-base font-semibold font-['Poppins']">
                Status
              </div>
              <button
                className="w-[100px] h-8 px-4 py-1 rounded-md border border-neutral-300 justify-center items-center gap-2.5 inline-flex"
                onClick={() => navigate("/MyOrder")}
              >
                <div className="text-indigo-950 text-base font-normal font-['Poppins']">
                  On Pack
                </div>
              </button>
              <button
                className="w-[100px] h-8 px-4 py-1 rounded-md border border-neutral-300 justify-center items-center gap-2.5 inline-flex"
                onClick={() => navigate("/MyOrderSent")}
              >
                <div className="text-indigo-950 text-base font-normal font-['Poppins']">
                  Sent
                </div>
              </button>
              <button
                className="w-[100px] h-8 px-4 py-1 bg-amber-400 rounded-md justify-center items-center gap-2.5 inline-flex"
                onClick={() => navigate("/MyOrderFinished")}
              >
                <div className="text-violet-900 text-base font-semibold font-['Poppins']]">
                  Finished
                </div>
              </button>
            </div>

            <div className="w-full h-[774px] py-6 bg-white rounded-[10px] border border-neutral-300 flex-col justify-start items-center gap-6 inline-flex overflow-hidden">
            <div className="orders-container w-full h-full overflow-y-auto">
              {/* Check if there are orders */}
              {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                <img className="Bingung" src={BingungImage} alt="No orders" />
                <div className="NoOrderYet text-center text-gray-800 text-base font-normal font-'Poppins'">
                  Hmm....<br />Looks like you still have no order yet
                </div>
                <button type="submit" className="swipe2 mt-4" onClick={handleGoBackShopping}>
                  <span className="text">Go Back Shopping</span>
                </button>
              </div>
              
              
              ) : (
                // Display orders
                orders.map((order) => (
                  <div key={order.orderId} className="w-full">
                    <div className="Frame9973 w-full px-6 justify-between items-center inline-flex">
                      <div className="OrderId12345678910 text-gray-800 text-xl font-medium font-['Poppins']">
                        Order ID : {order.orderId}
                      </div>
                      <div className="OrderDate03April2024 text-right">
                        <span className="text-gray-800 text-base font-normal font-['Poppins']">
                          Order Date:{" "}
                        </span>
                        <span className="text-gray-800 text-base font-medium font-['Poppins']">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                    </div>
                    <hr className="w-5/4 h-[1px] border-t border-neutral-300 my-4" />
  
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="Frame10050 w-full px-6 justify-between items-end inline-flex mb-5"
                      >
                        <div className="Frame10047 justify-start items-start gap-6 flex">
                          <div className="Group2282 w-20 h-20 relative">
                            <div className="Rectangle3 w-20 h-20 left-0 top-0 absolute rounded-[10px] border border-gray-300" />
                            <img
                              loading="lazy"
                              srcSet={item.imgSrc}
                              className="shrink-0 w-20 aspect-square rounded-xl"
                            />
                          </div>
                          <div className="item-details flex flex-col gap-1">
                            <div className="item-name text-gray-800 text-base font-semibold font-poppins">
                              {item.name}
                            </div>
                            <div className="item-name text-gray-800 text-base font-normal font-poppins">
                              Size: {item.size}
                            </div>
                            <div className="qty text-gray-800 text-sm font-normal font-poppins">
                              Qty: {item.quantity}pcs
                            </div>
                          </div>
                        </div>
                        <div className="Rp1250000 text-gray-800 text-lg font-semibold font-['Poppins']">
                          Rp {item.price.toLocaleString("id-ID")}
                        </div>
                      </div>
                    ))}
  
                    <hr className="w-full h-[1px] border-t border-neutral-300 my-4" />
                    <div
                      className="Frame9928 w-full justify-between items-start inline-flex px-6"
                      style={{ width: "100%" }}
                    >
                      <div className=" w-[45%] flex-col justify-start items-start gap-4 inline-flex">
                        <div className=" h-[67px] flex-col justify-start items-start gap-1 flex">
                          <div className=" text-gray-800                           text-lg font-medium font-['Poppins']">
                            Customer
                          </div>
                          <div className=" text-gray-800 text-base font-normal font-['Poppins']">
                            {order.name}
                          </div>
                          <div className=" text-gray-800 text-base font-normal font-['Poppins']">
                            {order.phone}
                          </div>
                        </div>
                        <div className=" h-[88px] flex-col justify-start items-start gap-1 flex">
                          <div className=" text-slate-500 text-sm font-normal font-['Poppins']">
                            Address
                          </div>
                          <div className="w-[100%] text-gray-800 text-base font-normal font-['Poppins']">
                            {order.address}
                          </div>
                        </div>
                        <div>
                          <div className="h-[49px] flex-col justify-start items-start gap-2 flex">
                            <div className="text-slate-500 text-sm font-normal font-['Poppins']">
                              Delivery Method
                            </div>
                            <div className="text-right text-gray-800 text-base font-normal font-['Poppins']">
                              Regular Shipping (J&T Express)
                            </div>
                          </div>
                        </div>
                        <div className="Line49 w-[100%] h-[0px] border border-neutral-300"></div>
                        <div className="text-gray-800 text-base font-normal font-['Poppins']">
                          No. resi : 123456789
                        </div>
                      </div>
                      <div
                        className="flex-col justify-start items-start gap-6 inline-flex"
                        style={{ marginLeft: "50px", width: "55%" }}
                      >
                        <div className="w-full h-[67px] flex-col justify-start items-start gap-4 flex">
                          <div className="Payment text-gray-800 text-lg font-medium font-['Poppins']">
                            Payment
                          </div>
                          <div className="Frame9924 w-[100%] justify-between items-start flex gap-10">
                            <div className="VirtualAccountBilling text-gray-800 text-base font-normal font-['Poppins']">
                              Virtual Account Billing
                            </div>
                            <div className=" text-right text-gray-800 text-base font-medium font-['Poppins']">
                              Via Midtrans
                            </div>
                          </div>
                        </div>
                        <div className="w-full h-[133px] flex-col justify-start items-start gap-4 flex">
                          <div className=" text-gray-800 text-lg font-medium font-['Poppins']">
                            Order Summary
                          </div>
                          <div className="w-full flex-col justify-start items-start gap-2 flex">
                            <div className=" w-full justify-between items-start inline-flex">
                              <div className="mt-4 w-[100%] justify-between items-start inline-flex">
                                <div className=" text-gray-800 text-sm font-normal font-['Poppins']">
                                  Subtotal
                                </div>
                                <div className=" text-right text-gray-800 text-sm font-normal font-['Poppins']">
                                  Rp{" "}
                                  {order.items
                                    .reduce(
                                      (totalPrice, item) =>
                                        totalPrice + item.price,
                                      0
                                    )
                                    .toLocaleString("id-ID")}
                                </div>
                              </div>
                            </div>
                            <div className=" w-[100%] justify-between items-start inline-flex">
                              <div className=" text-gray-800 text-sm font-normal font-['Poppins']">
                                Shipping
                              </div>
                              <div className="Rp30000 text-right text-gray-800 text-sm font-normal font-['Poppins']">
                                Rp 30.000
                              </div>
                            </div>
                            <div className="Line62 w-[100%] h-[0px] border border-neutral-300"></div>
                            <div className="Frame9926 w-[100%] justify-between items-start inline-flex">
                              <div className="Total text-gray-800 text-base font-medium font-['Poppins']">
                                Total
                              </div>
                              <div className="Rp135000 text-right text-gray-800 text-base font-medium font-['Poppins']">
                                Rp{" "}
                                {Math.floor(order.total).toLocaleString("id-ID")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full px-6 items-end flex justify-end my-8">
                      <div className="w-[200px] justify-between items-end gap-2.5 flex">
                        <button
                          className="w-[200px] h-10 px-4 py-2 bg-amber-400 rounded-lg justify-center items-center gap-2.5 flex"
                          onClick={handleCancel}
                        >
                          <div className="text-violet-900 text-base font-medium font-['Poppins']">
                            Cancel Order
                          </div>
                        </button>
                      </div>
                    </div>
                    <hr className="w-full h-[1px] border-t border-neutral-300 my-4" />
                  </div>
                  )
                ))}
              </div>
            </div>
          </div>
  
          <Footer />
        </div>
  
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <div className="popup-header">
                <h2>Cancel Order</h2>
                <button className="close-button" onClick={handleClosePopup}>
                  &times;
                </button>
              </div>
              <div className="popup-body">
                <p>Are you sure you want to cancel this order?</p>
              </div>
              <div className="popup-footer">
                <button className="cancel-button" onClick={handleClosePopup}>
                  No
                </button>
                <button
                  className="confirm-button"
                  onClick={() => console.log("Order cancelled")}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

export default MyOrderFinished;

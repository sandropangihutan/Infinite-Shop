import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Check from "../../assets/check.svg";
import "../../assets/css/orderdetails.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackSvg from "../../assets/navbar/back.svg";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [shippingUpdated, setShippingUpdated] = useState(false);
  const [closing, setClosing] = useState(false);
  const shippingRef = useRef(null);

  useEffect(() => {
    getOrderById();
  }, [orderId]);

  const getOrderById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/payment/all-data/${orderId}`
      );
      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const handleUpdateShipping = async () => {
    try {
      let newStatus;
      // Check current status and determine next status
      if (order.orderStatus === "Paid") {
        newStatus = "Ordered";
      } else if (order.orderStatus === "Ordered") {
        newStatus = "Done";
      } else {
        console.error("Invalid order status:", order.orderStatus);
        return;
      }
  
      // Send a request to update the order status
      await axios.put(
        `http://localhost:3000/api/payment/update-order-status/${orderId}`,
        { status: newStatus }
      );
  
      // Update the order state locally
      setOrder((prevOrder) => ({ ...prevOrder, orderStatus: newStatus }));
      setShippingUpdated(true);
  
      // Close the success message after a few seconds
      setTimeout(() => {
        setShippingUpdated(false);
      }, 3000); // Close after 3 seconds
    } catch (error) {
      console.error("Error updating shipping status:", error);
    }
  };
  
  

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShippingUpdated(false);
      setClosing(false);
    }, 500);
  };

  const handleClickOutside = (event) => {
    if (shippingRef.current && !shippingRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (shippingUpdated) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shippingUpdated]);

  if (!order) {
    return <div>Loading...</div>; // Handle loading state if order is not yet fetched
  }

  // Parse items JSON string into array
  const items = JSON.parse(order.items);

  // Calculate the total quantity of items
  const totalQty = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="orders-content">
      <div className="mx-12 pt-8 relative">
        <div className="text-3xl font-bold text-violet-600">Orders</div>
        <div className="text-xl text-black">Admin Infinite Learning Shop</div>
      </div>

      
        <Link
          to="/Orders"
          className="flex items-center gap-2 mt-5 ml-12"
          style={{ width: "fit-content" }}
        >
          <img src={BackSvg} alt="Back" className="w-6 h-6 mr-1" />
          <div className="text-slate-500 text-sm font-normal font-poppins">
            Back
          </div>
        </Link>
      

      <div className="mx-12 mt-7 relative">
        <div className="pt-5 relative bg-white rounded-2xl">
          <div className="px-10 text-lg font-bold font-poppins">
            {order.name}
          </div>
          <div className="px-10 text-xs text-gray-600 font-normal font-poppins mb-2">
            Order Number: {order.orderId}
          </div>

          <table className="w-full mx-auto">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-4 py-5 text-sm font-semibold font-poppins">
                  Orders Name
                </th>
                <th className="px-4 py-5 text-sm font-semibold font-poppins">
                  Size
                </th>
                <th className="px-4 py-5 text-sm font-semibold font-poppins">
                  Qty
                </th>
                <th className="px-4 py-5 text-sm font-semibold font-poppins">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* Map through items and render each item */}
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 text-sm font-normal font-poppins">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-sm font-normal font-poppins">
                    {item.size}
                  </td>
                  <td className="px-4 py-3 text-sm font-normal font-poppins">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-3 text-sm font-normal font-poppins">
                    IDR {item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full flex mt-[3rem] justify-end items-center px-10 py-10 ">
            <div className="w-1/2 flex justify-end gap-10 pr-10">
              <div className="text-black text-base font-normal font-poppins">
                Status:{" "}
                <span className="text-black text-sm font-semibold font-poppins">
                  {order.orderStatus}
                </span>
              </div>
              <div className="text-black text-sm font-normal font-poppins">
                Qty: {totalQty}
              </div>
              <div className="text-black text-sm font-normal font-poppins">
                <span className="font-semibold">
                  Total: IDR {Math.floor(order.total).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative bg-white rounded-2xl mx-12 mt-10">
        <div className="px-10 py-5">
        <div className="text-gray-400 text-sm mb-2">Address</div>
        <div className="mb-4">{order.address}</div>
        <div className="text-gray-400 text-sm mb-2">Delivery Method</div>
        <div>Regular Shipping (J&T Express)</div>
        </div>
      </div>
      <div className="flex justify-end mt-12 mr-10">
        <button
          className="bg-yellow-400 text-black font-medium py-3 px-4 mb-10 rounded-lg font-poppins"
          onClick={handleUpdateShipping}
        >
          Update Shipping
        </button>
      </div>
      {shippingUpdated && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 transition-opacity duration-500">
          <div
            ref={shippingRef}
            className={`relative w-96 h-96 bg-violet-600 rounded-2xl flex flex-col justify-center items-center ${
              closing ? "slide-down" : "slide-up"
            }`}
          >
            <div className="w-full h-9 text-white text-medium font-semibold font-poppins text-center">
              Shipping successfully updated!
            </div>
            <img className="mt-4" src={Check} alt="Check" />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;

import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../../assets/css/orderdetails.css";
import axios from "axios";

const Orders = () => {
  const [toggle, setToggle] = useState(false);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dropdownAnimation, setDropdownAnimation] = useState("");
  const dropdownRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch and update orders
  const fetchAndSetData = async () => {
    try {
      // First, update order statuses
      await updateOrderStatus();

      // Then, fetch updated data
      const response = await fetch(
        "http://localhost:3000/api/payment/all-data"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data); // Log data to ensure correct structure
      setAllData(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };

  // Function to update order status
  const updateOrderStatus = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/payment/check-and-fetch-orders"
      );
      if (response.status !== 200) {
        throw new Error("Failed to update orders status");
      }
    } catch (error) {
      console.error("Error updating orders status:", error);
      setError(error.message);
    }
  };

  // Use effect to fetch data on component mount
  useEffect(() => {
    fetchAndSetData();
  }, []);

  // Filter data based on status
  const Filter = (status) => {
    const filtered = allData.filter((item) => item.orderStatus === status);
    setFilteredData(filtered);
  };

  // Reset and fetch all data
  const All = () => {
    setFilteredData(allData);
  };

  const handleClick = () => {
    if (!toggle) {
      setDropdownAnimation("fade-In");
      setToggle(true);
    } else {
      setDropdownAnimation("fade-Out");
      setIsAnimating(true);
      setTimeout(() => {
        setToggle(false);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownAnimation("fade-Out");
      setIsAnimating(true);
      setTimeout(() => {
        setToggle(false);
        setIsAnimating(false);
      }, 300);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="orders-content">
      <div className="mx-14 pt-8 relative">
        <div className="text-3xl font-bold text-violet-600">Orders</div>
        <div className="text-xl text-black">Admin Infinite Learning Shop</div>
        <button
          className={`absolute right-0 top-12 w-56 h-10 bg-yellow-400 rounded-lg flex justify-center items-center transition-opacity duration-500 ${
            toggle ? "opacity-80" : "opacity-100"
          }`}
          onClick={handleClick}
        >
          <div className="text-indigo-950 text-lg font-medium font-['Poppins']">
            Status
            <FontAwesomeIcon
              icon={toggle ? faChevronDown : faChevronRight}
              className={`ml-6 transition-transform duration-500 ease-in-out ${
                toggle ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </button>
        {(toggle || isAnimating) && (
          <div
            ref={dropdownRef}
            className={`absolute right-0 w-56 bg-white border border-gray-300 rounded-lg py-2 shadow-md z-10 ${dropdownAnimation}`}
          >
            <ul>
              <li>
                <button
                  onClick={All}
                  className="w-full text-left px-4 py-1 hover:bg-gray-100"
                >
                  All
                </button>
              </li>
              <li className="mb-1">
                <button
                  onClick={() => Filter("Paid")}
                  className="w-full text-left px-4 py-1 hover:bg-gray-100"
                >
                  Paid
                </button>
              </li>
              <li className="mb-1">
                <button
                  onClick={() => Filter("Ordered")}
                  className="w-full text-left px-4 py-1 hover:bg-gray-100"
                >
                  Ordered
                </button>
              </li>
              <li>
                <button
                  onClick={() => Filter("Done")}
                  className="w-full text-left px-4 py-1 hover:bg-gray-100"
                >
                  Done
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="mx-14 mt-8 relative">
      <div className="flex-col w-full mb-10">
        {error && <div className="text-red-500">Error: {error}</div>}
        {filteredData &&
          filteredData.map((data, index) => (
            <Link to={`/Order/detail/${data.orderId}`} key={index}>
              <div>
                <div className="flex">
                  <div className="w-full flex py-6 pl-6 bg-gray-300 rounded-2xl mt-4 justify-center gap-10 text-sm font-poppins">
                    <div className="w-1/6 text-black font-semibold ml-5">
                      {data.name}
                    </div>
                    <div className="w-1/6 text-black">
                      <span className="font-normal">Status: </span>
                      <span className="font-semibold">
                        {data.orderStatus}
                      </span>
                    </div>
                    <div className="w-2/6 text-black overflow-hidden overflow-ellipsis whitespace-nowrap max-w-xs">
                      {data.items
                        ? JSON.parse(data.items)
                            .map((item) => item.name)
                            .join(", ")
                        : "No items"}
                    </div>
                    <div className="w-1/12 text-black">
                      Qty:{" "}
                      {data.items
                        ? JSON.parse(data.items).reduce(
                            (acc, item) => acc + item.quantity,
                            0
                          )
                        : 0}
                    </div>
                    <div className="w-1/6 text-black">
                      Total: IDR {Math.floor(data.total).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;

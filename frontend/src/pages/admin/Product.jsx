import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/product.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { getMe } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const { isError } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isError) {
      navigate("/Login");
    }
  }, [isError, navigate]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [arrowDirection, setArrowDirection] = useState("down");
  const categories = ["All", "T-Shirt", "Sticker", "Lanyard", "Totebag"];
  const [filtered, setFiltered] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:3000/products");
    setProducts(response.data);
    setFiltered(response.data);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const filteredData = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(filteredData);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = (productId) => {
    setProductIdToDelete(productId);
    setShowPopupDelete(true);
  };
  const handleConfirmDelete = () => {
    if (productIdToDelete) {
      deleteProduct(productIdToDelete);
      setProductIdToDelete(null);
    }
    setShowPopupDelete(false);
  };
  const handleCancelDelete = () => {
    setProductIdToDelete(null);
    setShowPopupDelete(false);
  };
  const filteredData = (category) => {
    const filteredData =
      category === "All"
        ? products
        : products.filter((item) => item.category === category);
    setFiltered(filteredData);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleManageClick = () => {
    setShowPopup(true);
  };
  const handleReviewClick = () => {
    setShowReview(!showReview);
    setArrowDirection(arrowDirection === "down" ? "up" : "down");
  };
  const handleFilterChange = (category) => {
    if (category === "All") {
      setFiltered(products);
    } else {
      const filteredData = products.filter((product) => product.category === category);
      setFiltered(filteredData);
    }
  };
  return (
    <div className="product-container">
      <div className="product-content">
        <div className="flex flex-col ml-10 w-[90%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col px-4 mt-2 max-md:mt-10 max-md:max-w-full">
            <div className="text-2xl font-bold text-violet-600 max-md:max-w-full">
              Products
            </div>
            <div className="mt-2 text-xl text-black max-w-[1305px] max-md:max-w-full">
              Admin Infinite Learning Shop
            </div>
            <div className="flex gap-2 mt-3 text-base font-medium text-indigo-950 max-md:flex-wrap max-md:pr-3 max-md:mt-5">
              <div className="flex gap-1.5 flex-grow px-3 text-base font-medium bg-white rounded-md text-gray-600 max-md:flex-wrap">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6169f7382e7b6488c84ca305e718b833c9e636f7eb796d80ce760a86e43598b2?"
                  className="shrink-0 my-auto aspect-square fill-gray-600 w-[16px]"
                />
                <input
                  className="max-w-prose bg-inherit w-full border-none outline-none focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="Search Products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center gap-1.5 px-10 py-2 text-lg font-medium whitespace-nowrap bg-yellow-400 rounded-md text-indigo-950 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <div>Category</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transform transition-transform duration-200 ${showDropdown ? "rotate-180" : ""
                      }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {showDropdown && (
                  <div className="absolute top-full mt-1 left-0 bg-white rounded-md shadow-md w-full z-10">
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-gray-100 text-center"
                      >
                        <button onClick={() => filteredData(category)}>
                          {category}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/Addproduct">
                <div className="relative">
                  <div className="flex justify-center text-lg font-medium whitespace-nowrap bg-yellow-400 rounded-md cursor-pointer">
                    <div className="flex gap-2 px-4 py-2">
                      <div className="text-indigo-950">Add</div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4d2195608fde33570b58c6a10aff88eef293a45e574afd1c219715f71359d209?"
                        className="shrink-0 w-2.5 aspect-square fill-indigo-950"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex flex-wrap justify-between mt-16 max-md:pr-5 max-md:mt-10 max-md:max-w-full">
              {filtered.map((product) => (
                <div key={product.id} className="w-full max-w-[214px] mb-5 max-md:w-[48%]">
                  <div
                    key={product}
                    className="w-full max-w-[214px] mb-5 max-md:w-[48%]"
                  >
                    <div className="flex flex-col bg-white rounded-3xl shadow-sm relative">
                      <img
                        loading="lazy"
                        srcSet={product.cardurl}
                        className="w-full shadow-sm aspect-[1.15]"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f9bfdfd7125ac096d827700d2367e18ee2b96f0ecbfa3c7f7994359dbbd13c3?"
                        className="w-full aspect-square fill-red-500 max-w-[30px] close-button"
                        onClick={() => handleDelete(product.id)}
                      />

                      <div className="flex flex-col items-start p-4">
                        <div className="text-base text-black">
                          {product.name}
                        </div>
                        <div className="flex gap-2">
                          <Link to={`edit/${product.id}`}>
                            <button className="justify-center px-3.5 py-1.5 mt-2.5 text-sm text-white bg-violet-600 rounded-xl">
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={handleManageClick}
                            className="justify-center px-3.5 py-1.5 mt-2.5 text-sm text-white bg-violet-600 rounded-xl"
                          >
                            Rating
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {showPopupDelete && (
            <div className="popup-delete">
              <div className="popup-content">
                <div className="py-2.5 pl-16 bg-white rounded-3xl max-w-[551px] max-md:pl-5">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col self-stretch my-auto text-base text-center text-red-500 max-md:mt-10">
                        <div className="self-center text-2xl font-bold">
                          UH-OH !!!
                        </div>
                        <div className="mt-2 text-sm text-slate-500">
                          Are you sure you want to delete this product ?
                        </div>
                        <div className="flex justify-center mt-10 space-x-3">
                          <button
                            onClick={handleConfirmDelete}
                            className="px-6 py-2 text-white bg-red-500 rounded-[100px]"
                          >
                            Yes
                          </button>
                          <button
                            onClick={handleCancelDelete}
                            className="px-6 py-2 text-red-500 bg-transparent border border-red-500 rounded-[100px]"
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col ml-5 w-[100%] max-md:ml-0 max-md:w-full">
                      <img
                        loading="lazy"
                        srcSet="https://i.postimg.cc/fyNGt84r/LOH.png"
                        className="w-full aspect-square max-md:mt-2.5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* {showPopup && (
            <div className="popup-container">
              <div className="popup-content">
                <div className="popup">
                  <div className="popup-inner">
                    <div className="popup-header">
                      <div className="flex items-center justify-between w-full">
                        <h2 className="text-xl font-semibold text-black">
                          Product Details
                        </h2>
                        <button
                          onClick={() => setShowPopup(false)}
                          className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                    <div className="popup-body">
                      <div className="flex gap-5">
                        <div className="flex-shrink-0 w-1/2">
                          <img
                            loading="lazy"
                            src="Images/Tshirtwhite3.png"
                            alt="Product"
                            className="w-full rounded-xl"
                          />
                        </div>
                        <div className="flex flex-col w-1/2">
                          <div className="text-xl font-semibold text-black">
                            Product name
                          </div>

                          <input
                            type="text"
                            className="px-4 py-2 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                            placeholder="Enter product name"
                          />
                          <div className="text-xl font-semibold text-black mt-4">
                            Product category
                          </div>
                          <input
                            type="text"
                            className="px-4 py-2 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                            placeholder="Enter product category"
                          />
                          <div className="text-xl font-semibold text-black mt-4">
                            Price
                          </div>
                          <input
                            type="text"
                            className="px-4 py-2 mt-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                            placeholder="Enter price"
                          />
                          <div className="text-xl font-semibold text-black mt-4">
                            Upload product picture
                          </div>
                          <input type="file" className="mt-2" />
                          <button
                            onClick={handleReviewClick}
                            className="flex items-center mt-4 text-sm text-blue-500"
                          >
                            <div className="flex-grow">Ulasan Produk</div>
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/dce4d4e2e5a84e6a916339b2f58bfce31fee55311f0937f2b8dd3c7b492fa1b1?"
                              alt="Review Icon"
                              className={`w-6 h-6 ml-2 transform transition-transform duration-200 ${
                                arrowDirection === "up" ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    {showReview && (
                      <div className="flex flex-col pt-1.5 pb-5 max-w-[834px]">
                        <div className="w-full text-base font-medium text-black max-md:max-w-full">
                          Lorem ipsum.
                        </div>
                        <div className="flex gap-1 self-start mt-2.5">
                          <div className="flex flex-1 gap-1 ">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/79c26ae23869748d97eae20f850944272786129695488e7770c43ee5bd6e8ff8?"
                              className="shrink-0 w-2.5 aspect-square fill-black"
                            />
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/79c26ae23869748d97eae20f850944272786129695488e7770c43ee5bd6e8ff8?"
                              className="shrink-0 w-2.5 aspect-square fill-black"
                            />
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bdb4fc7432f1a7cdc20448af42d5f2ca42eae386922942841b16f252cbe170af?"
                              className="shrink-0 aspect-[0.9] fill-black w-[9px]"
                            />
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/79c26ae23869748d97eae20f850944272786129695488e7770c43ee5bd6e8ff8?"
                              className="shrink-0 w-2.5 aspect-square fill-black"
                            />
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1153d271bfbb0f0fa3f2d40d420a5288af760061a2c454d0dee445c94dd4f9d9?"
                              className="shrink-0 w-2.5  border-solid aspect-square fill-white stroke-[0.5px] stroke-black"
                            />
                          </div>
                        </div>
                        <div className="mt-2.5 w-full text-sm text-gray-800 max-md:max-w-full">
                          20-10-2024 | Variasi : Lorem Ipsum{" "}
                        </div>
                        <div className="mt-2.5 w-full text-xs text-justify text-gray-700 max-md:max-w-full">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ut et massa mi. Aliquam in hendrerit urna.
                          Pellentesque sit amet sapien fringilla, mattis ligula
                          consectetur, ultrices mauris. Maecenas vitae mattis
                          tellus. Nullam quis imperdiet augue. Vestibulum auctor
                          ornare leo, non suscipit magna interdum eu. Curabitur
                          pellentesque nibh nibh, at maximus ante fermentum sit
                          amet. Pellentesque commodo lacus at sodales sodales.
                          Quisque sagittis orci ut diam condimentum, vel euismod
                          erat placerat.{" "}
                        </div>
                        <div className="mt-6 w-full text-base font-medium text-black max-md:max-w-full">
                          Lorem ipsum.
                        </div>
                        <div className="flex gap-1 self-start mt-2.5">
                          <div className="flex flex-1 gap-1">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/79c26ae23869748d97eae20f850944272786129695488e7770c43ee5bd6e8ff8?"
                              className="shrink-0 w-2.5 aspect-square fill-black"
                            />
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/79c26ae23869748d97eae20f850944272786129695488e7770c43ee5bd6e8ff8?"
                              className="shrink-0 w-2.5 aspect-square fill-black"
                            />
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bdb4fc7432f1a7cdc20448af42d5f2ca42eae386922942841b16f252cbe170af?"
                              className="shrink-0 aspect-[0.9] fill-black w-[9px]"
                            />
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/79c26ae23869748d97eae20f850944272786129695488e7770c43ee5bd6e8ff8?"
                              className="shrink-0 w-2.5 aspect-square fill-black"
                            />
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1153d271bfbb0f0fa3f2d40d420a5288af760061a2c454d0dee445c94dd4f9d9?"
                              className="shrink-0 w-2.5  border-solid aspect-square fill-white stroke-[0.5px] stroke-black"
                            />
                          </div>
                        </div>
                        <div className="mt-2.5 w-full text-sm text-gray-800 max-md:max-w-full">
                          20-10-2024 | Variasi : Lorem Ipsum{" "}
                        </div>
                        <div className="mt-2.5 w-full text-xs text-justify text-gray-700 max-md:max-w-full">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Ut et massa mi. Aliquam in hendrerit urna.
                          Pellentesque sit amet sapien fringilla, mattis ligula
                          consectetur, ultrices mauris. Maecenas vitae mattis
                          tellus. Nullam quis imperdiet augue. Vestibulum auctor
                          ornare leo, non suscipit magna interdum eu. Curabitur
                          pellentesque nibh nibh, at maximus ante fermentum sit
                          amet. Pellentesque commodo lacus at sodales sodales.
                          Quisque sagittis orci ut diam condimentum, vel euismod
                          erat placerat.{" "}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Product;

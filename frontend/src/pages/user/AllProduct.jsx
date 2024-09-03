import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

import filter from "../../assets/filter.png";

function AllProduct() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeButton, setActiveButton] = useState("Relevance");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState(200000); // Track the maximum price filter value

  // Fetch products data from the API
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        const products = response.data;
        setProducts(products);
        setFilteredProducts(products); // Initially display all products

        // Set the price range based on the fetched products
        const prices = products.map((product) => product.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceRange({ min: minPrice, max: maxPrice });
        setMaxPriceFilter(maxPrice); // Initialize the maximum price filter
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleNavClick = (buttonName) => {
    setActiveButton(buttonName);

    let sortedProducts = [...filteredProducts];
    if (buttonName === "Price : Highest - Lowest") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (buttonName === "Price : Lowest - Highest") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (buttonName === "Best Selling") {
      // Add sorting logic for "Best Selling" if available
    } else {
      sortedProducts = [...products]; // Default sort (Relevance)
    }

    setFilteredProducts(sortedProducts);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setMaxPriceFilter(value);
    const filtered = products.filter(
      (product) => product.price >= priceRange.min && product.price <= value
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category) {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Show all products if no category is selected
    }
  };

  return (
    <div>
      <div className="homepage-content">
        <Navbar />
        <div className="left-[130px] top-[140px] absolute flex gap-4">
          <Link
            to="/HomePage"
            className="text-slate-500 text-sm font-normal font-['Poppins']"
          >
            Home
          </Link>
          <div className="text-slate-500 text-sm font-normal font-['Poppins']">
            /
          </div>
          <button className="text-slate-500 text-sm font-normal font-['Poppins']">
            All Products
          </button>
        </div>
        <div className="left-[120px] top-[201px] absolute text-violet-600 text-[32px] font-semibold font-['Poppins']">
          All Products
        </div>
        <div className="h-[973px] left-[120px] top-[289px] absolute flex-col justify-start items-start gap-5 inline-flex">
          <div className="w-[1240px] rounded-[20px] justify-start items-center inline-flex">
            <div className="w-[82.50px] self-stretch px-8 py-4 rounded-tl-[20px] rounded-bl-[20px] border-l border-r border-t border-b border-neutral-300 justify-start items-center gap-[136px] flex">
              <button onClick={toggleSidebar}>
                <img
                  src={filter}
                  alt="filter"
                  className="w-[20px] h-[20px]" // Adjust the size as needed
                />
              </button>
            </div>
            <div className="grow shrink basis-0 p-4 rounded-tr-[20px] rounded-br-[20px] border-l border-r border-t border-b border-neutral-300 justify-start items-start gap-4 flex">
              <div
                className={`nav-button text-center text-sm font-normal font-['Poppins'] px-4 py-2 rounded-[100px] border border-neutral-300 justify-center items-center gap-2.5 flex ${
                  activeButton === "Relevance"
                    ? "active bg-violet-600 text-white"
                    : "hover:border-violet-600"
                }`}
                onClick={() => handleNavClick("Relevance")}
              >
                Relevance
              </div>
              <div
                className={`nav-button text-center text-sm font-normal font-['Poppins'] px-4 py-2 rounded-[100px] border border-neutral-300 justify-center items-center gap-2.5 flex ${
                  activeButton === "Best Selling"
                    ? "active bg-violet-600 text-white"
                    : "hover:border-violet-600"
                }`}
                onClick={() => handleNavClick("Best Selling")}
              >
                Best Selling
              </div>
              <div
                className={`nav-button text-center text-sm font-normal font-['Poppins'] px-4 py-2 rounded-[100px] border border-neutral-300 justify-center items-center gap-2.5 flex ${
                  activeButton === "Price : Highest - Lowest"
                    ? "active bg-violet-600 text-white"
                    : "hover:border-violet-600"
                }`}
                onClick={() => handleNavClick("Price : Highest - Lowest")}
              >
                Price : Highest - Lowest
              </div>
              <div
                className={`nav-button text-sm font-normal font-['Poppins'] px-4 py-2 rounded-[100px] border border-neutral-300 justify-center items-center gap-2.5 flex ${
                  activeButton === "Price : Lowest - Highest"
                    ? "active bg-violet-600 text-white"
                    : "hover:border-violet-600"
                }`}
                onClick={() => handleNavClick("Price : Lowest - Highest")}
              >
                Price : Lowest - Highest
              </div>
            </div>
          </div>
          <div>
            {isSidebarVisible && (
              <div className="w-[250px] h-[20 rounded-lg absolute top-[80px] border border-violet-600 left-1 bg-white shadow-black p-4 z-9">
                <h2 className="text-lg font-semibold text-violet-600">
                  Category
                </h2>
                <div className="mt-4">
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="option0"
                      name="filter"
                      value=""
                      className="text-violet-600 focus:ring-violet-600"
                      onChange={() => handleCategoryChange("")}
                      checked={selectedCategory === ""}
                    />
                    <label htmlFor="option0" className="ml-2 text-gray-500">
                      All
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="option1"
                      name="filter"
                      value="T-Shirt"
                      className="text-violet-600 focus:ring-violet-600"
                      onChange={() => handleCategoryChange("T-Shirt")}
                      checked={selectedCategory === "T-Shirt"}
                    />
                    <label htmlFor="option1" className="ml-2 text-gray-500">
                      T-Shirt
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="option2"
                      name="filter"
                      value="Sticker"
                      className="text-violet-600 focus:ring-violet-600"
                      onChange={() => handleCategoryChange("Sticker")}
                      checked={selectedCategory === "Sticker"}
                    />
                    <label htmlFor="option2" className="ml-2 text-gray-500">
                      Sticker
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="option3"
                      name="filter"
                      value="Lanyard"
                      className="text-violet-600 focus:ring-violet-600"
                      onChange={() => handleCategoryChange("Lanyard")}
                      checked={selectedCategory === "Lanyard"}
                    />
                    <label htmlFor="option3" className="ml-2 text-gray-500">
                      Lanyard
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="option4"
                      name="filter"
                      value="Tote bag"
                      className="text-violet-600 focus:ring-violet-600"
                      onChange={() => handleCategoryChange("Totebag")}
                      checked={selectedCategory === "Totebag"}
                    />
                    <label htmlFor="option4" className="ml-2 text-gray-500">
                      Tote bag
                    </label>
                  </div>
                  <div className="mb-2">
                    <input
                      type="radio"
                      id="option5"
                      name="filter"
                      value="Tumblr"
                      className="text-violet-600 focus:ring-violet-600"
                      onChange={() => handleCategoryChange("Tumblr")}
                      checked={selectedCategory === "Tumblr"}
                    />
                    <label htmlFor="option5" className="ml-2 text-gray-500">
                      Tumblr
                    </label>
                  </div>
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold text-violet-600">
                      Price
                    </h2>
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={maxPriceFilter}
                      onChange={handlePriceChange}
                      className="range [--range-shdw:#7c3aed] w-full mt-3 h-5 rounded-lg outline-none appearance-none transition-opacity duration-200 ease-in-out opacity-70 hover:opacity-100"
                      style={{ backgroundColor: "" }}
                    />
                    <p className="mt-2 text-violet-600">Rp {maxPriceFilter}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-start items-start gap-4">
            {filteredProducts.map((product, index) => (
              <div key={index} className="w-[286px] ml-2 cursor-pointer">
                <Link to={`/AllProduct/detail/${product.id}`}>
                  <div className="h-[352px] py-4 bg-gray-100 rounded-[10px] justify-center items-center flex">
                    <img
                      className="w-50 h-80 object-cover"
                      src={product.cardurl}
                      alt="placeholder"
                    />
                  </div>
                  <div className="mt-2 ml-2 text-gray-800 text-sm font-normal font-['Poppins']">
                    {product.name}
                  </div>
                  <div className="mt-2 ml-2 text-gray-800 text-sm font-semibold font-['Poppins']">
                    Rp {product.price}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllProduct;

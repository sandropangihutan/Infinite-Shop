import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from 'axios';
import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
import "../../assets/css/footer.css";
import { getMe } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";

function DetailProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const sizes = product ? product.size.split(',').map(size => size.trim()) : [];
  const [selectedSize, setSelectedSize] = useState(null);
  const { isError, user } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  const sizeButtons = sizes.map((size, index) => (
    <button
      key={index}
      className={`px-4 py-1.5 rounded-xl border ${size === selectedSize
        ? "bg-violet-600 text-white"
        : "border-neutral-300 text-slate-500 hover:border-violet-600"
        }`}
      onClick={() => handleSizeClick(size)}
      style={{
        cursor: "pointer",
        transition: "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease",
        marginRight: "8px",
      }}
    >
      {size}
    </button>
  ));

  useEffect(() => {
    getProductById();
  }, [id]);

  const getProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      setMainImage(response.data.producturl); // Set the main image initially
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleBackShopping = () => {
    navigate("/HomePage");
  };

  const [showPopup, setShowPopup] = useState(false);
  const handleAddToCart = async () => {
    try {
      if (!selectedSize) {
        alert("Please select a size.");
       
        return;
      }
      const totalPrice = product ? product.price : 200000;
      // Example payload, adjust according to your backend requirements
      const payload = {
        productId: id,
        userId:user.id,
        size: selectedSize,
      };
      const response = await axios.post("http://localhost:3000/cart", payload);
      setShowPopup(true);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const [showReview, setShowReview] = useState(false);

  const toggleReview = () => {
    setShowReview(!showReview);
  };
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const toggleDetailPopup = () => {
    setShowDetailPopup(!showDetailPopup);
  };
  const handleDetailPopupClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowDetailPopup(false);
    }
  };
  const [mainImage, setMainImage] = useState("Images/Tshirtblack.png");
  const [isZoomed, setIsZoomed] = useState(false);
  const handleThumbnailClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };
  const Rating = () => {
    const [rating, setRating] = useState(0);

  
    
    return (
      <div className="flex gap-1.5">
        {Array(5)
          .fill()
          .map((_, index) => (
            <img
              key={index}
              loading="lazy"
              src={
                index < rating
                  ? "https://cdn.builder.io/api/v1/image/assets/TEMP/d7c1bd9a40daa64115a5bda3df94c6a5838103c3f25b7d213a7b21054f6387bf?"
                  : "https://cdn.builder.io/api/v1/image/assets/TEMP/2f05ab6d61e908f5e54d13fdebb95a055f85af9861306937b245036b676a7865?"
              }
              className="w-5 h-5 cursor-pointer"
              alt={index < rating ? "Star" : "Star Outline"}
              onClick={() => setRating(index + 1)}
            />
          ))}
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="self-center mt-6 w-full max-w-[1200px] max-md:max-w-full px-4 ml-36">
        <div
          className="flex gap-3 text-sm text-slate-500 w-full mb-5 cursor-pointer"
          onClick={handleBackShopping}
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/29eeb05c19b5178ffd86b30ce1a68086eafe45aead812e71631f787794478e50?"
            className="shrink-0 w-6 aspect-square"
            alt="Back"
          />
          <div className="my-auto">Back Shopping</div>
        </div>
        <div className="flex gap-5 w-full max-md:flex-col max-md:gap-3 mr-4 mt-3">
          <div className="w-[30%] max-md:w-full mt-20">
            <img
              loading="lazy"
              src={mainImage}
              className="w-full rounded-lg cursor-pointer"
              alt="Product"
              onClick={toggleZoom}
              style={{
                transform: isZoomed ? "scale(1.2)" : "none",
                transition: "transform 0.3s ease",
              }}
            />
            <div className="mt-5 flex gap-3 max-md:flex-col">
              {product &&
                [
                  product.producturl,
                  product.producturl2,
                  product.producturl3,
                  product.producturl4,
                ].map((url, index) => (
                  <div
                    key={index}
                    className="w-[33%] max-md:w-full"
                    onClick={() => handleThumbnailClick(url)}
                  >
                    <img
                      loading="lazy"
                      src={url}
                      className="w-full border border-violet-600 rounded-lg p-2 cursor-pointer"
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </div>
                ))}
            </div>
          </div>
          
          <div className="w-[50%] max-md:w-full ml-40">
            <div className="text-2xl font-medium text-gray-800">
              <div className="text-2xl font-medium text-gray-800">
                {product?.name || "Product Name"}
              </div>
            </div>
            <div className="flex gap-3.5 items-center mt-3">
              <Rating />
              <div className="text-lg font-medium text-gray-800 border-l border-gray-800 pl-2.5">
                100+ Terjual
              </div>
            </div>
            <div className="mt-4 text-3xl font-medium text-gray-800">
              {product?.price ? `Rp. ${formatNumber(product.price)}` : "Rp. 200.000"}
            </div>
            <div className="mt-5 text-xl text-gray-800">
              {product?.briefDescription? `${product.briefDescription}` : "description"}

            </div>
            <div
              className="mt-5 text-xl text-gray-800 border-b border-gray-800 pb-2 w-max cursor-pointer"
              onClick={toggleDetailPopup}
            >
              View Product Detail
            </div>
            <div className="mt-7 text-2xl font-medium text-gray-800">Size</div>
            {sizeButtons}
            
            <div className="flex gap-5 justify-between mt-7 text-xl max-md:flex-wrap">
              <div
                className="flex-1 p-2.5 text-violet-600 rounded-xl border border-violet-600 text-center cursor-pointer hover:bg-violet-600 hover:text-white transition duration-300"
                onClick={handleAddToCart}
              >
                + Cart
              </div>
              <Link
                to="/checkout"
                className="flex-1 p-2.5 text-white bg-violet-600 rounded-xl border border-violet-600 text-center cursor-pointer"
              >
                Buy Now
              </Link>
            </div>
            {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="py-2.5 pl-16 bg-white rounded-3xl max-w-[551px] max-md:pl-5">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col self-stretch my-auto text-center max-md:mt-10">
                        <div className="self-center text-2xl font-bold text-green-600">
                          OH YEAH !!!
                        </div>
                        <div className="mt-2 text-sm text-slate-500">
                          Your product has been added to cart
                        </div>
                        <div
                          className="justify-center px-9 py-1 mt-10 text-base text-white whitespace-nowrap bg-green-600 rounded-[100px] max-md:px-5 cursor-pointer"
                          onClick={handleClosePopup}
                        >
                          Continue
                        </div>
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
            {showDetailPopup && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
                onClick={handleDetailPopupClick}
              >
                <div
                  className="flex flex-col items-start p-5 font-medium text-gray-800 bg-white rounded-3xl max-w-[877px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex gap-5 justify-center self-start text-2xl">
                    <img
                      loading="lazy"
                      srcSet={product.cardurl}
                      className="w-[80px]"
                      alt="T-shirt Thumbnail"
                    />
                    <div className="flex flex-col justify-center my-auto">
                      <div>{product?.name || "Product Name"}</div>
                      <div className="mt-2.5"> {product?.price ? `Rp. Rp. ${formatNumber(product.price)}` : "Rp. 200.000"}</div>
                    </div>
                  </div>
                  <div className="self-end mt-1.5 text-xl text-justify max-md:max-w-full">  
                    <br />
                    {product?.fullDescription ? `${product.fullDescription}` : "deskripsi"}
                    <br />
                    Available Sizes: {product?.size ? `${product.size}` : "Size"}
                    <br />
                  </div>
                </div>
              </div>
            )}
            <div
              className="flex gap-5 justify-between p-2.5 bg-white rounded-xl shadow-sm max-w-[658px] max-md:flex-wrap mt-6 cursor-pointer"
              onClick={toggleReview}
            >
              <div className="text-2xl text-gray-800">Review (5)</div>
              <div className="flex gap-3 justify-between my-auto">
                <div className="flex gap-1.5 justify-center my-auto">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4896f5171df857837ae9d74f5c4fdd5279da18d21588f3e27aa3e92b425b0c8d?"
                    className="shrink-0 aspect-[1.05] fill-amber-400 w-[21px]"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4896f5171df857837ae9d74f5c4fdd5279da18d21588f3e27aa3e92b425b0c8d?"
                    className="shrink-0 aspect-[1.05] fill-amber-400 w-[21px]"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4896f5171df857837ae9d74f5c4fdd5279da18d21588f3e27aa3e92b425b0c8d?"
                    className="shrink-0 aspect-[1.05] fill-amber-400 w-[21px]"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4896f5171df857837ae9d74f5c4fdd5279da18d21588f3e27aa3e92b425b0c8d?"
                    className="shrink-0 aspect-[1.05] fill-amber-400 w-[21px]"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4896f5171df857837ae9d74f5c4fdd5279da18d21588f3e27aa3e92b425b0c8d?"
                    className="shrink-0 aspect-[1.05] fill-amber-400 w-[21px]"
                  />
                </div>
                {showReview ? (
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e0e3356afcb7a6b5c49c9e17485d5398c743cff60400d4de1b4cd839b635005?"
                    className="shrink-0 w-8 aspect-square"
                  />
                ) : (
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3936a2f6dd84613d74310a7ad573e430302d2ea063900f586507e07edde8c528?"
                    className="shrink-0 w-8 aspect-square"
                  />
                )}
              </div>
            </div>
            {showReview && (
              <div className="flex flex-col px-2.5 pb-5 bg-white rounded-xl max-w-[658px]">
                <div className="flex flex-col py-2.5 pr-2 mt-4 border-b border-solid border-slate-400 max-md:max-w-full">
                  <div className="text-lg font-medium text-gray-800 max-md:max-w-full">
                    Lorem ipsum.
                  </div>
                  <div className="flex gap-4 self-start mt-4">
                    <div className="flex gap-1.5 justify-center self-start">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/75aaf30f540bc4cea54d0a1560084e8733755ca9ff9296f8b8d59821e79e82c1?"
                        className="shrink-0 aspect-[1.05] fill-amber-400 w-[21px]"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4896f5171df857837ae9d74f5c4fdd5279da18d21588f3e27aa3e92b425b0c8d?"
                        className="shrink-0 aspect-[1.05] fill-amber-400 w-[21px]"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4896f5171df857837ae9d74f5c4fdd5279da18d21588f3e27aa3e92b425b0c8d?"
                        className="shrink-0 aspect-[1.05] fill-amber-400 w-[21px]"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4896f5171df857837ae9d74f5c4fdd5279da18d21588f3e27aa3e92b425b0c8d?"
                        className="shrink-0 aspect-[1.05] fill-amber-400 w-[21px]"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f05ab6d61e908f5e54d13fdebb95a055f85af9861306937b245036b676a7865?"
                        className="w-5 h-5"
                        alt="Star Outline"
                      />
                    </div>
                    <div className="text-base font-medium text-gray-800">
                      20-10-2024 | Variasi : Lorem Ipsum{" "}
                    </div>
                  </div>
                  <div className="mt-4 text-lg font-medium text-gray-600 max-md:max-w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </div>
                <div className="flex flex-col py-2.5 pr-2 mt-4 border-b border-solid border-slate-400 max-md:max-w-full">
                  <div className="text-lg font-medium text-gray-800 max-md:max-w-full">
                    Lorem ipsum.
                  </div>
                  <div className="flex gap-4 self-start mt-4">
                    <div className="flex gap-1.5 justify-center self-start">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/75aaf30f540bc4cea54d0a1560084e8733755ca9ff9296f8b8d59821e79e82c1?"
                        className="shrink-0 aspect-[1.05] fill-amber-400 w-[21px]"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4896f5171df857837ae9d74f5c4fdd5279da18d21588f3e27aa3e92b425b0c8d?"
                        className="shrink-0 aspect-[1.05] fill-amber-400 w-[21px]"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4896f5171df857837ae9d74f5c4fdd5279da18d21588f3e27aa3e92b425b0c8d?"
                        className="shrink-0 aspect-[1.05] fill-amber-400 w-[21px]"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4896f5171df857837ae9d74f5c4fdd5279da18d21588f3e27aa3e92b425b0c8d?"
                        className="shrink-0 aspect-[1.05] fill-amber-400 w-[21px]"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f05ab6d61e908f5e54d13fdebb95a055f85af9861306937b245036b676a7865?"
                        className="w-5 h-5"
                        alt="Star Outline"
                      />
                    </div>
                    <div className="text-base font-medium text-gray-800">
                      20-10-2024 | Variasi : Lorem Ipsum{" "}
                    </div>
                  </div>
                  <div className="mt-4 text-lg font-medium text-gray-600 max-md:max-w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </div>
                <div className="flex flex-col py-2.5 pr-2 mt-4 border-b border-solid border-slate-400 max-md:max-w-full">
                  <div className="text-lg font-medium text-gray-800 max-md:max-w-full">
                    Lorem ipsum.
                  </div>
                  <div className="flex gap-4 self-start mt-4">
                    <div className="flex gap-1.5 justify-center self-start">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/75aaf30f540bc4cea54d0a1560084e8733755ca9ff9296f8b8d59821e79e82c1?"
                        className="shrink-0 aspect-[1.05] fill-amber-400 w-[21px]"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4896f5171df857837ae9d74f5c4fdd5279da18d21588f3e27aa3e92b425b0c8d?"
                        className="shrink-0 aspect-[1.05] fill-amber-400 w-[21px]"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4896f5171df857837ae9d74f5c4fdd5279da18d21588f3e27aa3e92b425b0c8d?"
                        className="shrink-0 aspect-[1.05] fill-amber-400 w-[21px]"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4896f5171df857837ae9d74f5c4fdd5279da18d21588f3e27aa3e92b425b0c8d?"
                        className="shrink-0 aspect-[1.05] fill-amber-400 w-[21px]"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f05ab6d61e908f5e54d13fdebb95a055f85af9861306937b245036b676a7865?"
                        className="w-5 h-5"
                        alt="Star Outline"
                      />
                    </div>
                    <div className="text-base font-medium text-gray-800">
                      20-10-2024 | Variasi : Lorem Ipsum{" "}
                    </div>
                  </div>
                  <div className="mt-4 text-lg font-medium text-gray-600 max-md:max-w-full">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </div>
                <div className="mt-8 text-lg font-medium text-gray-800 underline max-md:max-w-full">
                  Ulasan Lainnya.
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mb-40" />
      </div>
      <Footer />
    </div>
  );
}

export default DetailProduct;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackSvg from "../../assets/navbar/back.svg";
import Cod from "../../assets/navbar/cod.svg";
import Va from "../../assets/navbar/va.svg";
import "../../assets/css/swipebutton.css";
import "../../assets/css/checkout.css";
import Navbar from "../../Components/Navbar.jsx";
import Footer from "../../Components/Footer.jsx";
import axios from "axios";
import { useSelector } from "react-redux";

function Checkout() {
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const [shippingMethod, setShippingMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userId = user ? user.id : null;

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3000/cart/user`, { params: { userId } })
        .then((response) => {
          const items = response.data.map((item) => ({
            imgSrc: item.product.cardurl,
            name: item.product.name,
            size: item.size,
            quantity: item.quantity,
            subtotal: item.subtotal, // Pastikan menyimpan subtotal di state
            variant: item.size,
            
          }));
          setCartItems(items);
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
        });
    }
  }, [userId]);

  function handleShippingMethodChange(event) {
    setShippingMethod(event.target.value);
  }

  function handlePaymentMethodChange(event) {
    setPaymentMethod(event.target.value);
  }

  useEffect(() => {
    console.log(userId);
    // Lakukan operasi lain yang perlu dilakukan ketika user berubah
  }, [user]);

  const generateRandomId = () => {
    const min = 100000; 
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min; // Menghasilkan angka acak dalam rentang [1000, 9999]
  };

  const [orderId, setOrderId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState("pending");
  const [isChecking, setIsChecking] = useState(true);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedData = localStorage.getItem("checkoutData");
    if (storedData) {
      const { orderId, startTime, transactionStatus } = JSON.parse(storedData);
      setOrderId(orderId);
      setStartTime(new Date(startTime));
      setTransactionStatus(transactionStatus || "pending");
    }
  }, []);

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const orderId = generateRandomId();
      const fullName = `${firstName} ${lastName}`;
      const address = `${fullAddress}, ${district}, ${city}, ${province}`;
      const items = cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.subtotal, 
        imgSrc: item.imgSrc,
        size: item.size
      }));
      const data = {
        userId: userId,
        name: fullName,
        orderId: orderId,
        total: total,
        email: email,
        shipping_method: shippingMethod,
        payment_method: paymentMethod,
        phone: phone,
        address: address,
        postalCode: postalCode,
        shippingCost: shippingCost,
        items: items,
      };
      console.log(data)

      localStorage.setItem(
        "checkoutData",
        JSON.stringify({
          orderId,
          startTime: new Date(),
          transactionStatus: "pending",
        })
      );

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic U0ItTWlkLXNlcnZlci00VTVvbGlVb1c5cURXQ2RoU2pRTEJEMFc6",
        },
      };

      if (paymentMethod === "cod") {
        redirectToWhatsApp();
      } else {
        // Lakukan proses pembayaran online menggunakan Midtrans
        const response = await axios.post(
          "http://localhost:3000/api/payment/process-transaction",
          data,
          config
        );
        console.log(response);
        setOrderId(orderId);
        setStartTime(new Date());
        setToken(response.data.token);
      }
    } catch (error) {
      console.error("Error handling transaction:", error);
    }
  };
  //nambahin database di sini
  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          console.log("Payment Successful:", result);
          // Jika pembayaran berhasil, hapus data checkout dari localStorage
          localStorage.removeItem("checkoutData");
          setToken("");
          setEmail("");
          setFirstName("");
          setLastName("");
          setShippingMethod("");
          setPaymentMethod("");
          setPhone("");
          setProvince("");
          setCity("");
          setDistrict("");
          setFullAddress("");
          setPostalCode("");
          navigate("/Checkout");
        },
        onPending: (result) => {
          console.log("Payment Pending:", result);
          setToken("");
          navigate("/Checkout");
        },
        onError: (error) => {
          console.error("Payment error:", error);
          setToken("");
          navigate("/Checkout");
        },
        onClose: () => {
          // Ketika jendela Snap ditutup, periksa apakah pembayaran selesai atau tidak
          const checkoutData = localStorage.getItem("checkoutData");
          if (!checkoutData) {
            // Jika pembayaran belum selesai, gunakan data checkout dari localStorage untuk menetapkan kembali state
            const parsedData = JSON.parse(checkoutData);
            setEmail(parsedData.email);
            setFirstName(parsedData.name.split(" ")[0]);
            setLastName(parsedData.name.split(" ")[1]);
            setPhone(parsedData.phone);
            setFullAddress(parsedData.address);
            setPostalCode(parsedData.postalCode);
            setShippingMethod(parsedData.shipping_method);
            setPaymentMethod(parsedData.payment_method);
          }
        },
      });
    }
  }, [token, navigate]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("checkoutData");
    };
  }, []);

  //perlu disembunyikan clientkeynya
  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = "SB-Mid-client-Ghw_vLvOihC_QPbP";
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  function formatRupiah(amount) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  }

  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => total + Number(item.subtotal), 0);
  };

  const subtotal = calculateSubtotal(cartItems);
  const shippingCost = shippingMethod === "regular" ? 30000 : 0;
  const total = subtotal + shippingCost;

  const redirectToWhatsApp = () => {
    const whatsappNumber = "6289523300777"; // Ganti dengan nomor WhatsApp yang sesuai
    const url = `https://wa.me/${whatsappNumber}`;
    window.open(url, "_blank"); // Buka WhatsApp di tab baru
  };

  return (
    <div className="w-screen max-h-screen bg-white overflow-y-auto">
      <Navbar />
      <Link to="/HomePage">
        <div className="flex items-center gap-2 mt-8 ml-20">
          <img src={BackSvg} alt="Back" className="w-5 h-5 mr-1" />
          <div className="text-slate-500 text-xs font-normal font-['Poppins']">
            Back Shopping
          </div>
        </div>
      </Link>

      <div className="text-violet-600 mt-4 text-3xl pl-20 font-semibold font-['Poppins']">
        Checkout
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-row w-full h-[970px]">
          <div className="flex flex-col pl-20 pr-10 w-1/2 max-w-screen-md h-1000">
            <div className="h-96 inline-flex flex-col items-start gap-3 mt-7 w-full">
              <div className="text-gray-800 text-base font-semibold font-['Poppins']">
                Contact Information
              </div>
              <div className="flex w-full">
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 bg-white rounded-lg text-sm border border-neutral-300 focus:border-purple-500"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <hr className="w-full border border-neutral-10 my-2 " />
              <div className="text-gray-800 text-base font-semibold font-['Poppins']">
                Shipping Method
              </div>
              <div className="w-full h-10 flex-col justify-start items-start gap-4 inline-flex">
                <div className="w-full px-4 py-2 rounded-lg border border-neutral-300 justify-between items-center inline-flex">
                  <div className="justify-start items-center gap-3 flex">
                    <input
                      type="radio"
                      id="pick_up_spot"
                      name="shipping_method"
                      value="pick_up_spot"
                      className="w-2.5 h-2.5 rounded-full border border-violet-600 checked:bg-violet-600"
                      onChange={handleShippingMethodChange}
                    />
                    <div className="text-gray-800 text-sm font-normal font-['Poppins']">
                      Pick Up in Spot
                    </div>
                  </div>
                  <div className="text-gray-800 text-sm font-medium font-['Poppins']">
                    Free
                  </div>
                </div>
                <div className="w-full px-4 py-2 rounded-lg border border-neutral-300 justify-between items-center inline-flex">
                  <div className="justify-start items-center gap-3 flex">
                    <input
                      type="radio"
                      id="regular"
                      name="shipping_method"
                      value="regular"
                      className="w-2.5 h-2.5 rounded-full border border-violet-600 checked:bg-violet-600"
                      onChange={handleShippingMethodChange}
                    />
                    <div className="text-gray-800 text-sm font-normal font-['Poppins']">
                      Regular Shipping (J&T Express)
                    </div>
                  </div>
                  <div className="text-right text-gray-800 text-sm font-medium font-['Poppins']">
                    Rp 30.000
                  </div>
                </div>
                <hr className="w-full border border-neutral-10 my-2 " />
                <div
                  id="shippingAddressSection"
                  className={`flex flex-col gap-4 ${
                    shippingMethod === "pick_up_spot" ? "hidden" : ""
                  }`}
                >
                  <div className="text-gray-800 text-base font-semibold font-['Poppins']">
                    Shipping Address
                  </div>
                  <div className="w-full flex justify-between gap-8 ">
                    <div className="flex w-full">
                      <input
                        type="text"
                        name="firstname"
                        className="w-full px-4 py-2 bg-white rounded-lg text-sm border border-neutral-300 focus:border-purple-500"
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="flex w-full">
                      <input
                        type="text"
                        name="lastname"
                        className="w-full px-4 py-2 bg-white rounded-lg text-sm border border-neutral-300 focus:border-purple-500"
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-between gap-5">
                    <div className="flex w-full">
                      <input
                        type="text"
                        name="province"
                        className="w-full px-4 py-2 bg-white rounded-lg text-sm border border-neutral-300 focus:border-purple-500"
                        placeholder="Province"
                        onChange={(e) => setProvince(e.target.value)}
                      />
                    </div>
                    <div className="flex w-full">
                      <input
                        type="text"
                        name="city"
                        className="w-full px-4 py-2 bg-white rounded-lg text-sm border border-neutral-300 focus:border-purple-500"
                        placeholder="City/Regency"
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="flex w-full">
                      <input
                        type="text"
                        name="district"
                        className="w-full px-4 py-2 bg-white rounded-lg text-sm border border-neutral-300 focus:border-purple-500"
                        placeholder="District"
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-between gap-5">
                    <div className="flex w-full">
                      <textarea
                        name="address"
                        className="w-full px-4 pt-2 pb-8 bg-white rounded-lg text-sm border border-slate-300 focus:border-purple-500"
                        placeholder="Full Address"
                        onChange={(e) => setFullAddress(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full flex justify-between gap-5">
                    <div className="flex w-full">
                      <input
                        type="number"
                        name="postal"
                        className="w-full px-4 py-2 bg-white rounded-lg text-sm border border-neutral-300 focus:border-purple-500"
                        placeholder="Postal Code"
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </div>
                    <div className="flex w-full">
                      <input
                        type="number"
                        name="phone"
                        className="w-full px-4 py-2 bg-white rounded-lg text-sm border border-neutral-300 focus:border-purple-500"
                        placeholder="Phone: 08xxxxxxxxxx"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <hr className="w-full border border-neutral-10 my-2 " />
                </div>
                <div className="text-gray-800 text-base font-semibold font-['Poppins']">
                  Payment
                </div>
                <div
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 justify-between items-center inline-flex"
                  style={{
                    display: shippingMethod === "regular" ? "none" : "block",
                  }}
                >
                  <div className="justify-start items-center gap-3 flex">
                    <input
                      type="radio"
                      id="cod"
                      name="payment_method"
                      value="cod"
                      className="w-2.5 h-2.5 rounded-full border border-violet-600 checked:bg-violet-600"
                      onChange={handlePaymentMethodChange}
                    />
                    <img src={Cod} alt="Cash On Delivery" />
                    <div className="text-gray-800 text-sm font-normal font-['Poppins']">
                      Cash On Delivery
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 py-2 rounded-lg border border-neutral-300 justify-between items-center inline-flex">
                  <div className="justify-start items-center gap-3 flex">
                    <input
                      type="radio"
                      id="virtual_account"
                      name="payment_method"
                      value="virtual_account"
                      className="w-2.5 h-2.5 rounded-full border border-violet-600 checked:bg-violet-600"
                      onChange={handlePaymentMethodChange}
                    />
                    <img src={Va} alt="Virtual Account" />
                    <div className="text-gray-800 text-sm font-normal font-['Poppins']">
                      Online Payment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/2 mt-7 pl-10 pr-20">
            <div className="text-gray-800 text-base font-semibold font-['Poppins']">
              Order Summary
            </div>
            <div className="flex flex-col gap-4 items-start justify-start">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 relative flex justify-center items-center">
                        <div className="w-20 h-20 rounded-lg border border-gray-300 flex justify-center items-center">
                          <img
                            className="w-16 h-16 object-contain"
                            src={item.imgSrc}
                            alt={item.name}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-gray-800 text-base font-semibold font-['Poppins']">
                          {item.name}
                        </div>
                        <div className="text-gray-600 text-sm font-normal font-['Poppins']">
                          Size: {item.size}
                        </div>
                        <div className="text-gray-600 text-sm font-normal font-['Poppins']">
                          Qty: {item.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-800 text-sm font-semibold font-['Poppins']">
                      {formatRupiah(item.subtotal)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-800 text-sm font-normal font-['Poppins']">
                  No items in the cart.
                </div>
              )}
              <hr className="w-full border border-neutral-10 my-2" />
              <div className="flex justify-between w-full">
                <div className="text-gray-800 text-sm font-normal font-['Poppins']">
                  Subtotal
                </div>
                <div className="text-gray-800 text-sm font-semibold font-['Poppins']">
                  {formatRupiah(subtotal)}
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="text-gray-800 text-sm font-normal font-['Poppins']">
                  Shipping
                </div>
                <div className="text-gray-800 text-sm font-semibold font-['Poppins']">
                  {formatRupiah(shippingCost)}
                </div>
              </div>
              <hr className="w-full border border-neutral-10 my-2" />
              <div className="flex justify-between w-full">
                <div className="text-gray-800 text-base font-semibold font-['Poppins']">
                  Total
                </div>
                <div className="text-gray-800 text-base font-semibold font-['Poppins']">
                  {formatRupiah(total)}
                </div>
              </div>
              <button type="submit" className="swipe1 up w-full">
                <span className="text">Continue</span>
              </button>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default Checkout;

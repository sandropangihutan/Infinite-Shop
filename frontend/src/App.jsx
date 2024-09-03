import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import Product from "./pages/admin/Product";
import Addproduct from "./pages/admin/Addproduct";
import Editproduct from "./pages/admin/Editproduct";
import Users from "./pages/admin/Users";
import Message from "./pages/admin/Message.jsx";
import Login from "./Components/Login.jsx";
import Register from "./Components/Register.jsx";
import Orders from "./pages/admin/Orders.jsx";
import OrderDetails from "./pages/admin/Orderdetails.jsx";
import MyProfile from "./pages/user/MyProfile.jsx";
import MyOrder from "./pages/user/MyOrder.jsx";
import MyOrderFinished from "./pages/user/MyOrderFinished.jsx";
import MyOrderSent from "./pages/user/MyOrderSent.jsx";
import MyOrderFinishedEmpty from "./pages/user/MyOrderFinishedEmpty.jsx";
import MyOrderSentEmpty from "./pages/user/MyOrderSentEmpty.jsx";
import MyOrderEditRate from "./pages/user/MyOrderEditRate.jsx";
import MyOrderEmpty from "./pages/user/MyOrderEmpty.jsx";
import Settings from "./pages/admin/Settings.jsx";
import LandingPage from "./pages/user/landingpage.jsx";
import NavbarLP from "./Components/NavbarLP.jsx";
import SButtonLP from "./Components/SButtonLP.jsx";
import SwipeButton from "./Components/SwipeButton.jsx";
import Footer from "./Components/Footer.jsx";
import Slideshow from "./Components/Slideshow.jsx";
import HomePage from "./pages/user/homepage.jsx";
import CardSticker from "./Components/CardSticker.jsx";
import Cardbaju from "./Components/Cardbaju.jsx";
import CardLanyard from "./Components/CardLanyard.jsx";
import Chat from "./Components/Chat.jsx";
import CardTotebag from "./Components/CardTotebag.jsx";
import DetailProduct from "./pages/user/detailproduct.jsx";
import Payment from "./pages/user/Payment.jsx";
import Checkout from "./pages/user/chechout.jsx";
import CartTab from "./Components/CartTab.jsx";
import AllProduct from "./pages/user/AllProduct.jsx"


function App() {
  const { user, isSuccess } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      {/* <div className="flex flex-row"> */}
      {isSuccess && user?.role === "admin" && <Sidebar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Addproduct" element={<Addproduct />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Order/detail/:orderId" element={<OrderDetails />} />
        <Route path="/Message" element={<Message />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/NavbarLP" element={<NavbarLP />} />
        <Route path="/SwipeButtonLP" element={<SButtonLP />} />
        <Route path="/SwipeButton" element={<SwipeButton />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        {/* <Route path="/MyProfile" element={<MyProfiles />} /> */}
        <Route path="/MyOrder" element={<MyOrder />} />
        <Route path="/MyOrderFinished" element={<MyOrderFinished />} />
        <Route path="/MyOrderSent" element={<MyOrderSent />} />
        <Route path="/MyOrderEditRate" element={<MyOrderEditRate />} />
        <Route path="/MyOrderSentEmpty" element={<MyOrderSentEmpty />} />
        <Route path="/MyOrderFinishedEmpty" element={<MyOrderFinishedEmpty />} /> 
        <Route path="/MyOrderEmpty" element={<MyOrderEmpty />} />
        <Route path="/homepage/detail/:id" element={<DetailProduct />} />
        <Route path="/AllProduct/detail/:id" element={<DetailProduct />} />
        <Route path="/Slideshow" element={<Slideshow />} />
        <Route path="/CardSticker" element={<CardSticker />} />
        <Route path="/Cardbaju" element={<Cardbaju />} />
        <Route path="/CardLanyard" element={<CardLanyard />} />
        <Route path="/CardLanyard" element={<CardTotebag />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Product/edit/:id" element={<Editproduct />} />
        <Route path="/CartTab" element={<CartTab />} />
        <Route path="/AllProduct" element={<AllProduct />} />
      </Routes>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;

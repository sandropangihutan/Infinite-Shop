import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import video from "../../assets/topproduct.gif";
import paus from "../../assets/HAH.png";
import video2 from "../../assets/kategori.gif";
import "../../assets/css/homepage.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";

import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import Slideshow from "../../Components/Slideshow";
import CardSticker from "../../Components/CardSticker";
import Cardbaju from "../../Components/Cardbaju";
import CardLanyard from "../../Components/CardLanyard";
import Chat from "../../Components/Chat";
import CardTotebag from "../../Components/CardTotebag";
import { useDispatch, useSelector } from "react-redux";
import button1 from "../../assets/button.png";
function Model(props) {
  const { scene } = useGLTF("/kaos.glb");
  return <primitive object={scene} {...props} />;
}

function HomePage() {
  const [activeButton, setActiveButton] = useState("T-shirt");

  const handleNavClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <Chat />
      <Navbar />
      <div className="homepage-content">
        <div className="w-[1240px] h-96 left-[130px] top-[150px] absolute rounded-[20px] justify-end items-start gap-10 inline-flex">
          <Slideshow />
        </div>
        <div className="w-[30%] h-[10%] left-[540px] top-[587px] absolute justify-center items-center inline-flex">
          <img className="w-[454px] h-[85px]" src={video} alt="GIF" />
        </div>
        <>
          <Canvas
            dpr={[1, 2]}
            camera={{ fov: 45 }}
            gl={{ alpha: true }}
            style={{
              position: "absolute",
              top: "550px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "30%",
            }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <PresentationControls
              speed={1.5}
              global
              polar={[-0.1, Math.PI / 10]}
            >
              <Stage environment={null}>
                <Model scale={1} castShadow={true} receiveShadow={false} />
              </Stage>
            </PresentationControls>
          </Canvas>
          <div
            style={{
              position: "absolute",
              top: "800px",
              left: "calc(50% + 22%)",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              gap: "2px", // Menambahkan jarak antara gambar paus dan tombol
            }}
          >
            <div className="w-[133px] h-[43px] px-4 py-2 bg-violet-600 rounded-[20px] justify-center items-center inline-flex">
              <div className="text-white text-lg font-normal font-['Poppins']">
                Slide Here
              </div>
            </div>
            <img
              className="w-40 h-40"
              src={paus}
              style={{
                width: "40%",
                left: "20 %",
                height: "auto",
                rotate: "-10.74deg",
              }}
            />
          </div>
        </>
        <div className="w-[30%] h-[10%] left-[555px] top-[1210px] absolute justify-center items-center inline-flex">
          <img className="w-[467px] h-[87px]" src={video2} alt="GIF" />
        </div>
        <nav>
          <div className="nav-container left-[230px] top-[1377px] absolute rounded-[30px] border border-violet-600">
            <div
              className={`nav-button ${
                activeButton === "T-shirt" ? "active" : ""
              }`}
              onClick={() => handleNavClick("T-shirt")}
            >
              T-shirt
            </div>
            <div
              className={`nav-button ${
                activeButton === "Sticker" ? "active" : ""
              }`}
              onClick={() => handleNavClick("Sticker")}
            >
              Sticker
            </div>
            <div
              className={`nav-button ${
                activeButton === "Lanyard" ? "active" : ""
              }`}
              onClick={() => handleNavClick("Lanyard")}
            >
              Lanyard
            </div>
            <div
              className={`nav-button ${
                activeButton === "Totebag" ? "active" : ""
              }`}
              onClick={() => handleNavClick("Totebag")}
            >
              Totebag
            </div>
            <div className="left-[-50px] top-[150px] absolute">
              <TransitionGroup>
                {activeButton === "T-shirt" && (
                  <CSSTransition key="T-shirt" timeout={300} classNames="slide">
                    <Cardbaju />
                  </CSSTransition>
                )}
                {activeButton === "Sticker" && (
                  <CSSTransition key="Sticker" timeout={300} classNames="slide">
                    <CardSticker />
                  </CSSTransition>
                )}
                {activeButton === "Lanyard" && (
                  <CSSTransition key="Lanyard" timeout={300} classNames="slide">
                    <CardLanyard />
                  </CSSTransition>
                )}
                {activeButton === "Totebag" && (
                  <CSSTransition key="Totebag" timeout={300} classNames="slide">
                    <CardTotebag />
                  </CSSTransition>
                )}
              </TransitionGroup>
            </div>
          </div>
        </nav>
      </div>
      <div className="ml-[40%] -mt-10 mb-20">
        <Link to="/AllProduct" className="w-[360px] h-[46px] inline-block">
          <div className="w-[360px] h-[46px] px-[100px] py-2  border-2 border-violet-600 rounded-[50px] flex justify-between items-center">
            <div className="text-center text-violet-600 text-xl font-semibold font-['Poppins']">
              View More
            </div>
            <img
              className="ml-auto"
              src={button1}
              alt="button1"
              width="30" // Specify width as needed
              height="30" // Specify height as needed
            />
          </div>
        </Link>
      </div>
      <Footer
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}
      />
    </div>
  );
}

export default HomePage;

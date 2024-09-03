import React from 'react';
import "./../assets/css/navbarLP.css";
import { Link } from 'react-router-dom';

function NavbarLP() {
    return (
        <div className="navbar-container">
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                    <img
                        src="/Images/LogoFooter.png"
                        alt="Infinite Shop Logo"
                        className="w-40 h-auto"
                    />
                </div>
                <div className="flex-container-right">
                    <div className="buttons">
                        <Link to="/Login">
                            <button className="blob-btn">LOGIN
                                <span className="blob-btn__inner">
                                    <span className="blob-btn__blobs">
                                        <span className="blob-btn__blob"></span>
                                        <span className="blob-btn__blob"></span>
                                        <span className="blob-btn__blob"></span>
                                        <span className="blob-btn__blob"></span>
                                    </span>
                                </span>
                            </button>
                        </Link>
                        <span></span>
                        <Link to="/Register">
                            <button className="blob-btn">
                                <span className="blob-btn__inner">
                                    <span className="blob-btn__blobs">
                                        <span className="blob-btn__blob"></span>
                                        <span className="blob-btn__blob"></span>
                                        <span className="blob-btn__blob"></span>
                                        <span className="blob-btn__blob"></span>
                                    </span>
                                </span>
                                SIGN UP
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* Letakkan elemen SVG di sini */}
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
                        <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                    </filter>
                </defs>
            </svg>
        </div>
    );
}

export default NavbarLP;

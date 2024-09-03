import React from 'react';
import POV from '../../assets/POV.svg'; // Import file CSS yang berisi animasi swipe
import '../../assets/css/landingpage.css';
import NavbarLP from "./../../Components/NavbarLP";
import SButtonLP from '../../Components/SButtonLP';
import tagline from '../../assets/tagline.svg';
import beanbag from '../../assets/bean bag IL.svg';
import buskecil from '../../assets/bus kecil.svg';
import desain11 from '../../assets/desain 11 item.svg';
import desain4 from '../../assets/Desain 4.svg';
import desain13 from '../../assets/desain13.svg';
import FooterLP from '../../Components/FooterLP';
function LandingPage() {

    return (
        <div className="landing-page" style={{ backgroundColor: '#8A3DFF' }}>
            <div className="w-[100%] h-[100%]" style={{ position: 'center' }}>
                <img src={POV} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                <NavbarLP />
                <div className="left-[83px] top-[208px] absolute text-white text-8xl font-normal bebas-neue-regular leading-10 hover-animation" style={{ textShadow: '4px 4px 6px rgba(0, 0, 0, 0.5)' }}>INFINITE SHOP </div>
                <div className="w-[36%] h-14 left-[83px] top-[298px] absolute text-amber-400 text-5xl font-normal font- bebas-neue-regular leading-10 hover-animation" style={{ textShadow: '4px 4px 6px rgba(0, 0, 0, 0.5)' }}>For your</div>
                <div className="left-[83px] top-[396px] absolute text-white text-8xl font-normal font- bebas-neue-regular  leading-10 hover-animation" style={{ textShadow: '4px 4px 6px rgba(0, 0, 0, 0.5)' }}>Infinite taste</div>
                <div className="left-[83px] top-[498px] absolute">
                    <SButtonLP />
                </div>
                <img className="w-52 h-52 left-[1158px] top-[431px] absolute hover-animation" src={beanbag} />
                <img className="w-40 h-36 left-[726px] top-[178px] absolute hover-animation" src={tagline} />
                <img className="w-64 h-64 left-[667px] top-[397px] absolute hover-animation" src={buskecil} />
                <img className="w-52 h-52 left-[952px] top-[506px] absolute hover-animation" src={desain11} />
                <img className="w-60 h-60 left-[919px] top-[183px] absolute hover-animation" src={desain13} />
                <img className="w-48 h-52 left-[1206.11px] top-[135px] absolute origin-top-left rotate-[8.99deg] hover-animation" src={desain4} />
                <FooterLP />
            </div>
        </div>
    );
}

export default LandingPage;

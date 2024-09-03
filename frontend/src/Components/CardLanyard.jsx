import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../assets/css/lanyard.css";

function CardLanyard() {
  const [lanyards, setLanyards] = useState([]);

  useEffect(() => {
    getLanyards();
  }, []);

  const getLanyards = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      const filteredLanyards = response.data.filter(product => product.category === "Lanyard");
      setLanyards(filteredLanyards);
    } catch (error) {
      console.error("Error fetching lanyards", error);
    }
  };
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };


  return (
    <div className="absolute flex-row justify-start items-center gap-[100px] flex">
      {lanyards.map((lanyard) => (
        <div key={lanyard.id} className="card1" style={{ borderRadius: "50px" }}>
          <div className="image">
            <img
              src={lanyard.cardurl} // Assuming the API provides this field for the image URL
              width="260px"
              height="260px"
              alt={lanyard.name}
            />
          </div>
          <div className="content">
            <h2>{lanyard.name}</h2>
            <h4>RP : {formatPrice(lanyard.price)}</h4>
            <Link to={`detail/${lanyard.id}`}>See Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardLanyard;

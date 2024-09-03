import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../assets/css/cardtotebag.css";

function CardTotebag() {
  const [totebags, setTotebags] = useState([]);
  const [imageIndices, setImageIndices] = useState({});

  useEffect(() => {
    getTotebags();
  }, []);

  const getTotebags = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      const filteredTotebags = response.data.filter(product => product.category === "Totebag");
      setTotebags(filteredTotebags);
      // Initialize image indices for each product
      const initialIndices = filteredTotebags.reduce((acc, product) => {
        acc[product.id] = 0;
        return acc;
      }, {});
      setImageIndices(initialIndices);
    } catch (error) {
      console.error("Error fetching totebags", error);
    }
  };

  const handleImageChange = (productId, index) => {
    setImageIndices({
      ...imageIndices,
      [productId]: index
    });
  };
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <div className="absolute flex-row justify-start items-center gap-[100px] flex">
      {totebags.map((totebag) => {
        const imageIndex = imageIndices[totebag.id];
        const images = [totebag.cardurl, totebag.cardurl2, totebag.cardurl3];

        return (
          <div key={totebag.id} className="card3" style={{ borderRadius: "50px" }}>
            <div className="image">
              <img
                srcSet={images[imageIndex]} // Use the current image based on the state
                width="260px"
                height="260px"
                alt={totebag.name}
              />
            </div>
            <div className="content">
              <h2>{totebag.name}</h2>
              <div className="color">
                <h3>Variation :</h3>
                <span className="number" onClick={() => handleImageChange(totebag.id, 0)}>1</span>
                <span className="number" onClick={() => handleImageChange(totebag.id, 1)}>2</span>
                <span className="number" onClick={() => handleImageChange(totebag.id, 2)}>3</span>
              </div>
              <h4>RP : {formatPrice(totebag.price)}</h4>
              <Link to={`detail/${totebag.id}`}>See Details</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CardTotebag;

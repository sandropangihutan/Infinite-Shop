import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../assets/css/cardsticker.css";

function CardSticker() {
  const [stickers, setStickers] = useState([]);
  const [imageIndices, setImageIndices] = useState({});

  useEffect(() => {
    getStickers();
  }, []);

  const getStickers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      const filteredStickers = response.data.filter(product => product.category === "Sticker");
      setStickers(filteredStickers);
      // Initialize image indices for each product
      const initialIndices = filteredStickers.reduce((acc, product) => {
        acc[product.id] = 0;
        return acc;
      }, {});
      setImageIndices(initialIndices);
    } catch (error) {
      console.error("Error fetching stickers", error);
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
      {stickers.map((sticker) => {
        const imageIndex = imageIndices[sticker.id];
        const images = [sticker.cardurl, sticker.cardurl2, sticker.cardurl3];

        return (
          <div key={sticker.id} className="card2" style={{ borderRadius: "50px" }}>
            <div className="image">
              <img
                srcSet={images[imageIndex]} // Use the current image based on the state
                width="260px"
                height="260px"
                alt={sticker.name}
              />
            </div>
            <div className="content">
              <h2>{sticker.name}</h2>
              <div className="color">
                <h3>Variation :</h3>
                <span className="number" onClick={() => handleImageChange(sticker.id, 0)}>1</span>
                <span className="number" onClick={() => handleImageChange(sticker.id, 1)}>2</span>
                <span className="number" onClick={() => handleImageChange(sticker.id, 2)}>3</span>
              </div>
              <h4>RP : {formatPrice(sticker.price)}</h4>
              <Link to={`detail/${sticker.id}`}>See Details</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CardSticker;

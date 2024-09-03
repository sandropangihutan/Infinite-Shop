import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../assets/css/cardbaju.css";
import "../assets/css/cardsticker.css";

function Cardbaju() {
  const [products, setProducts] = useState([]);
  const [imageIndices, setImageIndices] = useState({});

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      const filteredProducts = response.data.filter(product => product.category === "T-Shirt").slice(0, 3);
      setProducts(filteredProducts);
      // Initialize image indices for each product
      const initialIndices = filteredProducts.reduce((acc, product) => {
        acc[product.id] = 0;
        return acc;
      }, {});
      setImageIndices(initialIndices);
    } catch (error) {
      console.error("Error fetching products", error);
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
      {products.map((product) => {
        const imageIndex = imageIndices[product.id];
        const images = [product.cardurl, product.cardurl2, product.cardurl3];

        return (
          <div key={product.id} className="card" style={{ borderRadius: "50px" }}>
            <div className="image">
              <img
                srcSet={images[imageIndex]} // Use the current image based on the state
                width="260px"
                height="260px"
                alt={product.name}
              />
            </div>
            <div className="content">
              <h2>{product.name}</h2>
              <div className="color">
                <h3>Variation :</h3>
                <span className="number" onClick={() => handleImageChange(product.id, 0)}>1</span>
                <span className="number" onClick={() => handleImageChange(product.id, 1)}>2</span>
                <span className="number" onClick={() => handleImageChange(product.id, 2)}>3</span>
              </div>
              <h4>RP : {formatPrice(product.price)}</h4>
              <Link to={`detail/${product.id}`}>See Details</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cardbaju;

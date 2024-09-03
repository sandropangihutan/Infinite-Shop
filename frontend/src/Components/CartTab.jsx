import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function CartTab({ isCartOpen, closeCartSidebar }) {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCartOpen) {
      fetchCartData();
    }
  }, [isCartOpen]);

  const fetchCartData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cart/user');
      const itemsWithQuantity = response.data.map(item => ({ ...item, quantity: item.quantity || 1 }));
      setCartItems(itemsWithQuantity);
      calculateSubtotal(itemsWithQuantity);
    } catch (error) {
      console.error('Error fetching cart data:', error);
      // Handle error if needed
    }
  };

  const calculateSubtotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += parseInt(item.product.price) * item.quantity;
    });
    setSubtotal(total);
  };

  const handleDecreaseQuantity = (index) => {
    setCartItems(prevItems => {
      const newItems = [...prevItems];
      const currentItem = newItems[index];
  
      if (currentItem.quantity > 1) {
        newItems[index] = {
          ...currentItem,
          quantity: currentItem.quantity - 1
        };
      } else {
        newItems[index] = {
          ...currentItem,
          quantity: 1
        };
      }
  
      calculateSubtotal(newItems);
      return newItems;
    });
  };

  const handleIncreaseQuantity = (index) => {
    setCartItems(prevItems => {
      const newItems = [...prevItems]; 
      newItems[index] = {
        ...newItems[index], 
        quantity: newItems[index].quantity + 1 
      };
      calculateSubtotal(newItems); 
      return newItems; 
    });
  };

  const handleDeleteItem = async (id, index) => {
    try {
      await axios.delete(`http://localhost:3000/cart/${id}`);
      setCartItems(prevItems => {
        const newItems = [...prevItems];
        newItems.splice(index, 1);
        calculateSubtotal(newItems);
        return newItems;
      });
    } catch (error) {
      console.error('Error deleting cart item:', error);
      // Handle error if needed
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.patch('http://localhost:3000/updateCart', {
        items: cartItems.map(item => ({
          id: item.id,
          size: item.size,
          quantity: item.quantity,
          subtotal: parseInt(item.product.price) * item.quantity,
          userId: item.userId,
          productId: item.productId
        }))
      });
      console.log(response.data.message);
      navigate('/Checkout');
    } catch (error) {
      console.error('Error updating cart items:', error);
      // Handle error if needed
    }
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-[490px] bg-white z-50 shadow-lg rounded-3xl cart-sidebar ${isCartOpen ? "cart-sidebar-open" : ""}`}>
      <div className="flex flex-col h-full py-6 mx-auto w-full text-gray-800 bg-white rounded-3xl max-w-[480px]">
        <div className="flex gap-5 self-start ml-6 max-w-full text-lg font-semibold text-center text-violet-600 w-[273px]">
          <button onClick={closeCartSidebar}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/51533fbb960bb2f159a2a80a27f7030d02eecd65b5eea324d7d1581d91bba959?"
              className="shrink-0 aspect-square w-[27px] rounded-xl"
              alt="Close"
            />
          </button>
          <div className="flex-auto my-auto text-center">Your Cart ({cartItems.length} items)</div>
        </div>
        <div className="flex-grow overflow-y-auto mt-6 px-6 cart-scrollable">
          <div className="self-stretch mt-6 w-full bg-gray-300 border border-gray-300 border-solid min-h-[1px] rounded-xl" />
          {cartItems.map((item, index) => (
            <div key={item.id} className="flex gap-5 justify-between mt-6 w-full max-w-[431px]">
              <div className="flex gap-5 items-start text-sm">
                <img
                  loading="lazy"
                  srcSet={`${item.product.cardurl}`}
                  className="shrink-0 w-20 aspect-square rounded-xl"
                  alt="Product"
                />
                <div className="flex flex-col mt-1.5">
                  <div className="text-base font-medium">
                    {item.product.name}
                  </div>
                  <div className="mt-5 text-slate-500">Size: {item.size}</div>
                  <div className="flex gap-5 mt-3.5 text-center whitespace-nowrap">
                    <div className="flex gap-2 items-center">
                      <button onClick={() => handleDecreaseQuantity(index)}>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7f8447eedf99850cccdae33a73902b816e2b2823f61bc206e26a9846aec603c9?"
                          className="shrink-0 self-stretch my-auto w-4 aspect-square rounded-xl"
                          alt="Decrease"
                        />
                      </button>
                      <div className="justify-center self-stretch px-3 py-1 rounded-xl border border-solid border-slate-500">
                        {item.quantity}
                      </div>
                      <button onClick={() => handleIncreaseQuantity(index)}>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9addc1b0fc0d94767fde6b5298070deda07ce78079a13c02ef9ed09a309bb08e?"
                          className="shrink-0 self-stretch my-auto w-4 aspect-square rounded-xl"
                          alt="Increase"
                        />
                      </button>
                    </div>
                    <button onClick={() => handleDeleteItem(item.id, index)}>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2aadf3dc98e7c57e364d48ab3008ccf73c4c8a1d71cc44df4460087dfd65a2ef?"
                        className="shrink-0 my-auto w-6 aspect-square rounded-xl"
                        alt="Remove"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div className="self-end mt-16 text-base font-semibold text-right">
                Rp {parseInt(item.product.price) * item.quantity}
              </div>
            </div>
          ))}

          <div className="self-stretch mt-6 w-full bg-gray-300 border border-gray-300 border-solid min-h-[1px] rounded-xl" />
        </div>
        <div className="mt-6 px-6 w-full">
          <div className="flex gap-5 justify-between text-lg font-semibold max-w-[432px] mx-auto">
            <div>Subtotal</div>
            <div className="text-right">Rp {subtotal}</div>
          </div>
          <div className="flex w-full justify-center items-center mt-6">
            <div
              onClick={handleCheckout}
              className="px-6 py-3 w-full text-lg font-semibold text-center text-white bg-violet-600 rounded-xl max-w-[432px] cursor-pointer"
            >
              Checkout
            </div>
          </div>
          <div className="mt-6 text-lg
          text-violet-600 underline text-center">
            Continue Shopping
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartTab;

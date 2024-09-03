const initialState = {
    orders: [], // Initial state for orders
  };
  
  // Reducer function
  const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
      // Define cases for different actions that modify orders state
      default:
        return state;
    }
  };
  
  export default ordersReducer;
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authSlice.js";
import ordersReducer from './reducers/orderReducer.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: ordersReducer,
    },
});
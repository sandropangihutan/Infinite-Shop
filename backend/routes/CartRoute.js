import express from 'express';
import {
    getAllCarts,
    createCart,
    updateCart,
    deleteCart,
    getCartsByUser
} from '../controllers/Carts.js';

const router = express.Router();

// Routes for Carts
router.get('/cart/', getAllCarts); // GET all carts
router.post('/cart', createCart); // CREATE a new cart
router.patch('/updatecart/',updateCart); // UPDATE cart by ID
router.delete('/cart/:id', deleteCart); // DELETE cart by ID
router.get('/cart/user', getCartsByUser);

export default router;

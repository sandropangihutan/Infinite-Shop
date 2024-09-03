import Carts from '../models/CartModel.js';
import Products from '../models/ProductModel.js';
import Users from '../models/UserModel.js';
import { Op } from 'sequelize';


export const getAllCarts = async (req, res) => {
    try {
        const carts = await Carts.findAll({
            include: [
                { model: Products },
                { model: Users }
            ]
        });
        res.status(200).json(carts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};


export const createCart = async (req, res) => {
    const { size, userId, productId } = req.body;
    try {
        const newCart = await Carts.create({
            size,
            userId,
            productId
        });
        res.status(201).json(newCart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { items } = req.body;

        // Periksa apakah items adalah sebuah array
        if (!Array.isArray(items)) {
            return res.status(400).json({ message: 'Invalid items format. Expected an array.' });
        }

        // Loop through each item in the items array
        for (let item of items) {
            const { id, size, subtotal,quantity, userId, productId } = item;

            // Cari cart berdasarkan id
            let cart = await Carts.findByPk(id);

            if (!cart) {
                console.error(`Cart item with id ${id} not found.`);
                continue; // Skip to the next item in case not found
            }

            // Update properties of cart
            cart.size = size;
            cart.quantity = quantity;
            cart.subtotal = subtotal;
            cart.userId = userId;
            cart.productId = productId;

            // Simpan perubahan ke database
            await cart.save();
        }

        // Berhasil mengupdate semua carts
        res.status(200).json({ message: 'Carts updated successfully' });
    } catch (err) {
        console.error('Error updating carts:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};


export const deleteCart = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await Carts.findByPk(id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        await cart.destroy();
        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
export const getCartsByUser = async (req, res) => {
    try {
        // Periksa apakah req.session.userId didefinisikan
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Please log in to your account!' });
        }

        // Lanjutkan dengan mencari keranjang yang dimiliki oleh pengguna dengan userId tersebut
        const carts = await Carts.findAll({
            where: { userId },
            include: [
                { model: Products },
                { model: Users }
            ]
        });

        res.status(200).json(carts);
    } catch (err) {
        console.error('Error fetching carts:', err);
        res.status(500).json({ message: 'Server Error' });
    }
};
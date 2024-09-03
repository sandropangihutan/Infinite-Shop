import express from 'express';
import midtransClient from 'midtrans-client';
import dotenv from 'dotenv';
import Order from '../models/Order.js';
import { Op } from 'sequelize';
import { verifyUser, adminOnly } from '../middleware/AuthUser.js';

dotenv.config();

const router = express.Router();

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

// Process transaction route
router.post('/process-transaction', async (req, res) => {
  try {
    const { userId, orderId, total, name, email, phone, address, postalCode, items, shippingCost } = req.body;

    // const totalAmount = total + shippingCost;
    
    const transactionItems = items.map(item => ({
      price: item.price,
      quantity: item.quantity,
      name: item.name,
      imgSrc: item.imgSrc,
      size: item.size
    }));

    const parameter = {
      transaction_details: { order_id: orderId, gross_amount: total},
      customer_details: {
        first_name: name,
        email,
        phone,
        shipping_address: { address, postal_code: postalCode }
      },
      callbacks: { finish: process.env.CALLBACK_URL }
    };

    const transaction = await snap.createTransaction(parameter);

    // const itemsJson = JSON.stringify(transactionItems);

    await Order.create({
      userId, // Save userId here
      orderId,
      name,
      total,
      email,
      phone,
      address,
      postalCode,
      status: transaction ? 'pending' : 'failure',
      items: transactionItems
    });

    res.status(200).json({
      message: transaction ? "Transaction processed successfully" : "Transaction processed failed",
      dataPayment: transaction,
      token: transaction.token
    });
  } catch (error) {
    console.error("Error processing transaction:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/orders/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Ambil semua data order dari database berdasarkan user ID
    const orders = await Order.findAll({ where: { userId } });

    if (orders.length > 0) {
      res.status(200).json({ orders });
    } else {
      res.status(404).json({ message: 'No orders found for this user' });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/check-and-update-status/:orderId', async (req, res) => {
  const orderId = req.params.orderId;

  try {
    // Mengambil status transaksi dari Midtrans
    const transactionStatusResponse = await snap.transaction.status(orderId);
    const { transaction_status: transactionStatus } = transactionStatusResponse;

    // Update status transaksi di database
    const [updated] = await Order.update(
      { status: transactionStatus },
      { where: { orderId } }
    );

    if (updated) {
      res.status(200).json({ message: 'Transaction status updated successfully', transactionStatus });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error("Error checking and updating transaction status:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/check-all-orders', async (req, res) => {
  try {
const orders = await Order.findAll({
  where: {
    status: {
      [Op.notIn]: ['settlement', 'success']  
    }
  }
});

for (let order of orders) {
  const orderId = order.orderId;

  try {
    
    const transactionStatusResponse = await snap.transaction.status(orderId);    

    const { transaction_status: transactionStatus } = transactionStatusResponse;
    await Order.update(
      { status: transactionStatus },
      { where: { orderId } }
    );

  } catch (error) {
    console.error(`Error checking status for orderId ${orderId}:`, error);
    
  }
}

res.status(200).json({ message: 'All relevant orders status updated successfully' });
} catch (error) {
console.error("Error checking and updating relevant orders status:", error);
res.status(500).json({ message: error.message });
}
});


router.get('/all-data', async (req, res) => {
  try {
    const allData = await Order.findAll();
    res.status(200).json(allData);
  } catch (error) {
    console.error("Error fetching all data:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/all-data/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findOne({ where: { orderId } });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    res.status(500).json({ message: error.message });
  }
});

router.put('/update-order-status/:orderId', async (req, res) => {
  const orderId = req.params.orderId;
  try {
    // Find the order based on orderId
    const order = await Order.findOne({ where: { orderId } });
    
    // If the order is not found, send a 404 response
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Update order status based on its current status
    if (order.orderStatus === 'Paid') {
      order.orderStatus = 'Ordered';
      await order.save(); // Save changes to the database
      return res.status(200).json({ message: 'Order status updated to Ordered', order });
    } else if (order.orderStatus === 'Ordered') {
      order.orderStatus = 'Done';
      await order.save(); // Save changes to the database
      return res.status(200).json({ message: 'Order status updated to Done', order });
    } else {
      return res.status(400).json({ message: 'Order status is not Paid or Ordered' });
    }
  } catch (error) {
    console.error(`Error updating order status for order ${orderId}:`, error);
    res.status(500).json({ message: error.message });
  }
});


router.post('/check-and-fetch-orders', async (req, res) => {
  try {
    // Step 1: Check and update order statuses
    const orders = await Order.findAll({
      where: {
        status: {
          [Op.notIn]: ['settlement', 'success']
        }
      }
    });

    for (let order of orders) {
      const orderId = order.orderId;

      try {
        const transactionStatusResponse = await snap.transaction.status(orderId);
        const { transaction_status: transactionStatus } = transactionStatusResponse;

        await Order.update(
          { status: transactionStatus, orderStatus: 'Paid' },
          { where: { orderId } }
        );

      } catch (error) {
        console.error(`Error checking status for orderId ${orderId}:`, error);
      }
    }

    // Step 2: Update 'settlement' orders with null orderStatus to 'paid'
    const settlementOrders = await Order.findAll({
      where: {
        status: 'settlement',
        orderStatus: null
      }
    });

    if (settlementOrders.length > 0) {
      const orderIds = settlementOrders.map(order => order.orderId);

      await Order.update(
        { orderStatus: 'paid' },
        { where: { orderId: orderIds } }
      );

      console.log(`${settlementOrders.length} orders updated to 'paid'`);
    }

    // Step 3: Fetch all order data
    const allData = await Order.findAll();
    res.status(200).json(allData);

  } catch (error) {
    console.error("Error checking and updating relevant orders status or fetching all data:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/userstatus', async (req, res) => {
  const { userId } = req.body; // Ambil userId dari body request

  try {
    // Pastikan userId ada dan valid
    if (!userId) {
      return res.status(400).json({ message: 'UserId is required' });
    }

    // Step 1: Check and update order statuses
    const orders = await Order.findAll({
      where: {
        userId: userId, // Filter berdasarkan userId
        status: {
          [Op.notIn]: ['settlement', 'success']
        }
      }
    });

    for (let order of orders) {
      const orderId = order.orderId;

      try {
        const transactionStatusResponse = await snap.transaction.status(orderId);
        const { transaction_status: transactionStatus } = transactionStatusResponse;

        await Order.update(
          { status: transactionStatus, orderStatus: 'Paid' },
          { where: { orderId } }
        );

      } catch (error) {
        console.error(`Error checking status for orderId ${orderId}:`, error);
      }
    }

    // Step 2: Update 'settlement' orders with null orderStatus to 'paid'
    const settlementOrders = await Order.findAll({
      where: {
        userId: userId, // Filter berdasarkan userId
        status: 'settlement',
        orderStatus: null
      }
    });

    if (settlementOrders.length > 0) {
      const orderIds = settlementOrders.map(order => order.orderId);

      await Order.update(
        { orderStatus: 'paid' },
        { where: { orderId: orderIds } }
      );

      console.log(`${settlementOrders.length} orders updated to 'paid'`);
    }

    // Step 3: Fetch all order data for the specific user
    const allData = await Order.findAll({
      where: { userId: userId } // Filter berdasarkan userId
    });
    res.status(200).json(allData);

  } catch (error) {
    console.error("Error checking and updating relevant orders status or fetching all data:", error);
    res.status(500).json({ message: error.message });
  }
});


export default router;



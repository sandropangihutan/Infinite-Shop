import { DataTypes } from 'sequelize';
import sequelize from '../config/Database.js';

const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true, // Makes orderId the primary key
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  orderStatus: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false,
  }
}, {
  timestamps: true, // Ensure timestamps are enabled
});

export default Order;

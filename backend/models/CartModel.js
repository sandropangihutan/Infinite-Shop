import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
const { DataTypes } = Sequelize;


const Cart = db.define('carts', {
    size: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { 
            notEmpty: true,
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
}, {
    timestamps: false,  // Ensure timestamps are enabled
});
// Definisikan asosiasi antara Cart dan User
Cart.belongsTo(User, { foreignKey: 'userId' });

// Definisikan asosiasi antara Cart dan Product
Cart.belongsTo(Product, { foreignKey: 'productId' });
export default Cart;

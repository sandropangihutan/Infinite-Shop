import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Product = db.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    category: DataTypes.STRING,
    variant: DataTypes.STRING,
    briefDescription: DataTypes.STRING,
    fullDescription: DataTypes.STRING,
    size: DataTypes.STRING,
    productImage: DataTypes.STRING,
    producturl: DataTypes.STRING,
    productImage2: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    producturl2: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    productImage3: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    producturl3: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    productImage4: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    producturl4: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    cardImage: DataTypes.STRING,
    cardurl: DataTypes.STRING,
    cardImage2: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    cardurl2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cardImage3: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    cardurl3: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
}, {
    freezeTableName: true
});

export default Product;

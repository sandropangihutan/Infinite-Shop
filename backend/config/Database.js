import {Sequelize} from "sequelize";

const db = new Sequelize('db_shop', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;
import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import bodyParser from "body-parser";
import FileUpload from 'express-fileupload';
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import PaymentRoute from "./routes/PaymentRoute.js";
import CartRoute from "./routes/CartRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

try {
    await db.authenticate();
    console.log('Database Connected...');
} catch (error) {
    console.error(error);
}

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(FileUpload()); // Ensure this is before your routes

app.use(UserRoute);
app.use(ProductRoute);
app.use(CartRoute);
app.use(AuthRoute);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

app.use("/api/payment", PaymentRoute)



// Tambahkan rute dasar
app.get("/", (req, res) => {
    res.send("Server berjalan dengan baik");
});

app.listen(process.env.APP_PORT, ()=> {
         console.log('Server up and running...');
    });

export default app;

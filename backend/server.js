import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.route.js';
import connectToMongoDB from './db/connectToMongoDB.js';


const app = express();
dotenv.config();
const PORT = 8080;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("root route");
});





app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is listening on PORT : ${PORT}`);
});
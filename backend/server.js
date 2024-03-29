import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import messageRoutes from './routes/message.route.js';

const app = express();
dotenv.config();
const PORT = 8080;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
    res.send("root route");
});





app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is listening on PORT : ${PORT}`);
});
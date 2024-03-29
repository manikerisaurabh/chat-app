import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to mongodb");
    } catch (error) {
        console.log("Errow while connecting to MONGODB : " + error.message);
    }
};

export default connectToMongoDB;
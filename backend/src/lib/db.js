import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB is connected successfuly");
    }
    catch (error) {
        console.error("Error on connect MongoDB", error.message);
    }
}
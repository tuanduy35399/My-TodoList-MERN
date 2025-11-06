import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import taskRoute from "./routes/task.routes.js";
import cors from "cors";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use("/api", taskRoute);

(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Backend is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Cannot run backend', error.message);
    }
})(); 

import express from 'express'
// import { config } from "dotenv";
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import dbConnect from "./config/database.config";
import taskRoutes from "./routes/task.route"

// config();

dbConnect();
const app = express();


app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/tasks", taskRoutes);

app.listen("8000", () => {
    console.log(`Server is running on port ${8000}`);
}
);


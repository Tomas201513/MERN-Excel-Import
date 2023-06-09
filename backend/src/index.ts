import express from 'express'
import { config } from "dotenv";
import cors from "cors";
import dbConnect from "./config/database.config";
import taskRoutes from "./routes/task.routes"

config();

dbConnect();
const app = express();


app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.ORIGIN }));

app.use("/api/tasks", taskRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}
);


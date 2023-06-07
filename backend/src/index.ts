import express from 'express'
import { config } from "dotenv";
import cors from "cors";
import dbConnect from "./app/config/database.config.js";
import taskRoutes from "./app/routes/task.route.js"
config();
dbConnect();
const app = express();


app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/tasks", taskRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}
);

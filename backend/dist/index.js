"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { config } from "dotenv";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const database_config_1 = __importDefault(require("./config/database.config"));
const task_route_1 = __importDefault(require("./routes/task.route"));
// config();
(0, database_config_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:3000" }));
app.use("/api/tasks", task_route_1.default);
app.listen("8000", () => {
    console.log(`Server is running on port ${8000}`);
});
//# sourceMappingURL=index.js.map
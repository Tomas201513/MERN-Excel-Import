"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_model_1 = __importDefault(require("../models/task.model"));
const taskController = {
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tasks = yield task_model_1.default.find();
            return res.json(tasks);
        }
        catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }),
    getOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const task = yield task_model_1.default.findById(id);
            if (!task) {
                return res.status(404).json({
                    message: 'Task not found',
                });
            }
            return res.json(task);
        }
        catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, description } = req.body;
            const newTask = new task_model_1.default({ title, description });
            const taskSaved = yield newTask.save();
            return res.status(201).json(taskSaved);
        }
        catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { title, description } = req.body;
            const updatedTask = yield task_model_1.default.findByIdAndUpdate(id, {
                title,
                description,
            }, { new: true });
            return res.json(updatedTask);
        }
        catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield task_model_1.default.findByIdAndDelete(id);
            return res.json({
                message: 'Task deleted',
            });
        }
        catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }),
};
exports.default = taskController;
//# sourceMappingURL=task.controller.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = __importDefault(require("../controllers/task.controller"));
const router = express_1.default.Router();
router.get('/', task_controller_1.default.getAll);
router.get('/:id', task_controller_1.default.getOne);
router.post('/', task_controller_1.default.create);
router.put('/:id', task_controller_1.default.update);
router.delete('/:id', task_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=task.route.js.map
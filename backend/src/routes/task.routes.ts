import express from 'express';
import TaskController from '../controllers/task.controller';

const router = express.Router();

router.get('/', TaskController.getAll);
router.get('/:id', TaskController.getOne);
router.post('/', TaskController.create);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.delete);

export default router;

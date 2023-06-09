import { Request, Response } from 'express';
import Task from '../models/task.model';
import { ObjectId } from 'mongodb';

const taskController = {
  getAll: async (req: Request, res: Response): Promise<Response> => {
    try {
      const tasks = await Task.find();
      return res.json(tasks);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  getOne: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({
          message: 'Task not found',
        });
      }
      return res.json(task);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  create: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { title, description } = req.body;
      const newTask = new Task({ title, description });
      const taskSaved = await newTask.save();
      return res.status(201).json(taskSaved);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  update: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { Description, Unit, Quantity, Rate, Amount } = req.body;
      const updatedTask = await Task.findByIdAndUpdate( id, { Description, Unit, Quantity, Rate, Amount }, { new: true });
      if (!updatedTask) {
        return res.status(404).json({
          message: 'Task not found',
        });
      }
      return res.json(updatedTask);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },
  delete: async (req: Request, res: Response): Promise<Response> => {

    try {
      const { id } = req.params;
      const deletedTask = await Task.findByIdAndDelete(id);
      if (!deletedTask) {
        return res.status(404).json({
          message: 'Task not found',
        });
      }
      return res.json(deletedTask);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};

export default taskController;

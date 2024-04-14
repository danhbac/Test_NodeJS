import { Request, Response } from 'express';
import User, { IUser } from '../model/users.model';

// GET /users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /users/:id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /users
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const user: IUser = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT /users/:id
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const user: IUser | null = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE /users/:id
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
import express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../../controller/users.controller';
const route = express.Router();
route.get("", getUsers);
route.get("/:id", getUserById);
route.post("", createUser);
route.put("/:id", updateUser);
route.delete("/:id", deleteUser);
export default route;
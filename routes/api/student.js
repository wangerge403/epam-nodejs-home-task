import { Router } from 'express';
import {reGetUser, updateUser, createUser, deleteUser } from "../../services/userService"
import { asyncHandler } from "../sendResult"

const router = Router();

router.get("/", asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    return await reGetUser(id);
  }))
router.post("/", asyncHandler(async (req, res, next) => {
    const { login, password, age } = req.body;
    return await createUser({login, password, age});
  }))
router.delete("/", asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    return await deleteUser(id);
  }))
router.put("/", asyncHandler(async (req, res, next) => {
    const { login, password, age } = req.body;
    return await updateUser({login, password, age});
  }))


export default router;

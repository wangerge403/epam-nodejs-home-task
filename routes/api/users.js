import { Router } from 'express';
import { UserService } from "../../services/userService"
import { asyncHandler } from "../resultConfig"
import { validator } from "../../utils/validate"

const router = Router();
const userService = new UserService();
router.get("/user/:id", asyncHandler(async (req, res, next) => {
    const { id } = req.params.id;
    return await userService.reGetUser(id);
  }))
router.post("/user", asyncHandler(async (req, res, next) => {
    const { login, password, age, groupId } = req.body;
    await validator.isAge(age)
    await userService.createUser({login, password, age, groupId});
  }))
router.delete("/user", asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    return await userService.deleteUser(id);
  }))
router.put("/user", asyncHandler(async (req, res, next) => {
    const { id, login, age, groupId} = req.body;
    return await userService.updateUser({id, login, age, groupId});
  }))


export default router;

import { Router } from 'express';
import { GroupService } from "../../services/groupService"
import { asyncHandler } from "../resultConfig"
import { validator } from "../../utils/validate"

const router = Router();
const groupService = new GroupService();
router.get("/group/all", asyncHandler(async (req, res, next) => {
  return await groupService.getAllGroup();
}))
router.get("/group/:id", asyncHandler(async (req, res, next) => {
    const { id } = req.params.id;
    return await groupService.getGroupById(id);
  }))
router.post("/group", asyncHandler(async (req, res, next) => {
    const { groupName, permissions } = req.body;
    console.log("=======", groupName, permissions)
    await validator.permissions(permissions)
    return await groupService.createGroup({groupName, permissions})
  }))
router.delete("/group", asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    return await groupService.deleteGroup(id);
  }))
router.put("/group", asyncHandler(async (req, res, next) => {
    const { groupName, permissions } = req.body;
    return await groupService.updateGroup({groupName, permissions});
  }))


export default router;

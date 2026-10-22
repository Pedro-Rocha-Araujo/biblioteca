import { Router } from "express"
import { 
  getUsers, userRegister, getUserProfile, editUserProfile, deleteUserProfile 
} from "../controllers/userControllers.js"
import { checkToken } from "../middlewares/userMiddlewares.js"

const userRouter = Router()

userRouter.get("/users/", checkToken, getUsers)
userRouter.get("/users/:user_id", checkToken, getUserProfile)
userRouter.post("/users", checkToken, userRegister)
userRouter.put("/users/:user_id", checkToken, editUserProfile)
userRouter.delete("/users/:user_id", checkToken, deleteUserProfile)

export default userRouter
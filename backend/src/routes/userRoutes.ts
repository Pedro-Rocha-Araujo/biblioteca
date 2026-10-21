import { Router } from "express"
import { 
  getUsers, userRegister, getUserProfile, deleteUserProfile 
} from "../controllers/userControllers.js"
import { checkToken } from "../middlewares/userMiddlewares.js"

const userRouter = Router()

userRouter.get("/users/", checkToken, getUsers)
userRouter.get("/users/:user_id", checkToken, getUserProfile)
userRouter.post("/users", checkToken, userRegister)
userRouter.delete("/users", checkToken, deleteUserProfile)

export default userRouter
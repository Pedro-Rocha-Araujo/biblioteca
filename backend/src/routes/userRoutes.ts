import { Router } from "express"
import { 
  userRegister, getUserProfile, deleteUserProfile 
} from "../controllers/userControllers.js"
import { checkToken } from "../middlewares/userMiddlewares.js"

const userRouter = Router()

userRouter.get("/users", checkToken, getUserProfile)
userRouter.post("/users/register", userRegister)
userRouter.delete("/users", checkToken, deleteUserProfile)

export default userRouter
import { Router } from "express"
import { 
  userRegister, userLogin, getUserProfile, modifyUserProfile 
} from "../controllers/userControllers.js"
import { checkToken } from "../middlewares/userMiddlewares.js"

const userRouter = Router()

userRouter.get("/users", checkToken, getUserProfile)
userRouter.post("/users/register", userRegister)
userRouter.post("/users/login", userLogin)
userRouter.put("/users", checkToken, modifyUserProfile)

export default userRouter
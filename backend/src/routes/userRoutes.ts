import { Router } from "express"
import { userRegister, userLogin } from "../controllers/userControllers.js"

const userRouter = Router()

userRouter.post("/users/register", userRegister)
userRouter.post("/users/login", userLogin)

export default userRouter
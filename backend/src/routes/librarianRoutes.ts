import { Router } from "express"
import {
  librarianRegister, librarianLogin, getLibrarianProfile, updateLibrarianProfile, deleteLibrarianProfile
} from "../controllers/librarianControllers.js"
import { checkToken } from "../middlewares/userMiddlewares.js"

const librarianRouter = Router()

librarianRouter.get("/librarians", checkToken, getLibrarianProfile)
librarianRouter.post("/librarians/register", librarianRegister)
librarianRouter.post("/librarians/login", librarianLogin)
librarianRouter.put("/librarians", checkToken, updateLibrarianProfile)
librarianRouter.delete("/librarians", checkToken, deleteLibrarianProfile)

export default librarianRouter
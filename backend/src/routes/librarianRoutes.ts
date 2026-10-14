import { Router } from "express"
import {
  librarianRegister, librarianLogin, getLibrarianProfile
} from "../controllers/librarianControllers.js"

const librarianRouter = Router()

librarianRouter.get("/librarians", getLibrarianProfile)
librarianRouter.post("/librarians/register", librarianRegister)
librarianRouter.post("/librarians/login", librarianLogin)

export default librarianRouter
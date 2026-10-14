import { Router } from "express"
import {
  librarianRegister, librarianLogin
} from "../controllers/librarianControllers.js"

const librarianRouter = Router()

librarianRouter.post("/librarian/register", librarianRegister)
librarianRouter.post("/librarian/login", librarianLogin)

export default librarianRouter
import { Router } from "express"
import {
  librarianRegister
} from "../controllers/librarianControllers.js"

const librarianRouter = Router()

librarianRouter.post("/librarian/register", librarianRegister)

export default librarianRouter
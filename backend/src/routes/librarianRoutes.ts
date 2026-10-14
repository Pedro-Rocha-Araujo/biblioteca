import { Router } from "express"
import {
  librarianRegister, librarianLogin, getLibrarianProfile, updateLibrarianProfile, deleteLibrarianProfile
} from "../controllers/librarianControllers.js"

const librarianRouter = Router()

librarianRouter.get("/librarians", getLibrarianProfile)
librarianRouter.post("/librarians/register", librarianRegister)
librarianRouter.post("/librarians/login", librarianLogin)
librarianRouter.put("/librarians", updateLibrarianProfile)
librarianRouter.delete("/librarians", deleteLibrarianProfile)

export default librarianRouter
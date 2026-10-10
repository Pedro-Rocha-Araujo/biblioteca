import { Router } from "express"
import { getBooks } from "../controllers/bookControllers.js"

const bookRouter = Router()

bookRouter.get("/books", getBooks)

export default bookRouter
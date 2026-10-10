import { Router } from "express"
import { getBooks, postBook } from "../controllers/bookControllers.js"

const bookRouter = Router()

bookRouter.get("/books", getBooks)
bookRouter.post("/books", postBook)

export default bookRouter
import { Router } from "express"
import { deleteBook, getBook, getBooks, postBook, putBook } from "../controllers/bookControllers.js"

const bookRouter = Router()

bookRouter.get("/books", getBooks)
bookRouter.get("/books/:book_id", getBook)
bookRouter.post("/books", postBook)
bookRouter.put("/books/:book_id", putBook)
bookRouter.delete("/books/:book_id", deleteBook)

export default bookRouter